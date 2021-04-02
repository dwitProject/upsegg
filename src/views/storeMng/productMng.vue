<template>
  <v-main>
    <v-data-table :headers="headers" :items="productItems" :search="search">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>상품 관리</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="700px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn class="mb-2" v-bind="attrs" v-on="on">
                상품 등록
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formtitle }}</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field
                        color="#000"
                        label="상품명"
                        dense
                        v-model="editedItem.name"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-textarea
                        color="#000"
                        label="상품설명"
                        outlined
                        dense
                        v-model="editedItem.description"
                      ></v-textarea>
                    </v-col>
                    <v-col cols="4">
                      <v-select
                        color="#000"
                        :items="category"
                        label="카테고리"
                        dense
                        require
                        v-model="editedItem.category"
                      ></v-select>
                    </v-col>
                    <v-col cols="4">
                      <v-text-field
                        color="#000"
                        label="상품금액"
                        dense
                        v-model="editedItem.price"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="4">
                      <v-text-field
                        color="#000"
                        label="재고수량"
                        dense
                        v-model="editedItem.stock"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-file-input
                        color="#000"
                        truncate-length="15"
                        dense
                        accept="image/png, image/jpeg, image/bmp"
                        v-model="files"
                        multiple
                      ></v-file-input>
                    </v-col>
                  </v-row>
                </v-container>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" depressed @click="postProduct">
                    등록
                  </v-btn>
                  <v-btn color="error" depressed @click="close">취소</v-btn>
                </v-card-actions>
              </v-card-text>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="headline">
                {{ editedItem.name }}를(을) 삭제하시겠습니까?
              </v-card-title>
              <v-spacer></v-spacer>
              <v-card-actions>
                <v-spacer></v-spacer>
                <template>
                  <v-btn color="primary" depressed @click="removeProduct"
                    >확인</v-btn
                  >
                  <v-btn color="error" depressed @click="closeDelete"
                    >취소</v-btn
                  >
                </template>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
        <v-text-field
          v-model="search"
          append-icon="mdi-account-search"
          label="Search"
          single-line
          hide-details
          class="search-bar"
        ></v-text-field>
      </template>
      <template v-slot:[`item.files`]="{ item }">
        <v-btn small @click="seeMore(item)">상세보기</v-btn>
      </template>
      <template v-slot:[`item.modiOrDel`]="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
        <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
      </template>
    </v-data-table>
  </v-main>
</template>

<script>
import api from '../../api/product';

export default {
  name: 'productMng',
  data: () => ({
    search: '',
    dialog: false,
    dialogDelete: false,
    category: ['스테츄', '피규어', '포스터', '후드,자켓'],
    headers: [
      { text: '상품명', value: 'name' },
      { text: '상품설명', value: 'description' },
      { text: '카테고리', value: 'category' },
      { text: '상품금액', value: 'price' },
      { text: '상품수량', value: 'stock' },
      { text: '상품이미지', value: 'files', sortable: false },
      { text: '등록일', value: 'reDate' },
      { text: '수정·삭제', value: 'modiOrDel', sortable: false },
    ],
    productItems: [],
    editedIndex: -1,
    editedItem: {
      name: '',
      description: '',
      price: '',
      stock: '',
      category: '',
    },
    files: [],
  }),

  computed: {
    formtitle() {
      return this.editedIndex === -1 ? '상품 등록' : '상품 수정';
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  mounted() {
    this.getProducts();
  },

  methods: {
    // 전체 상품 조회 GET
    async getProducts() {
      const result = await api.get();
      console.log('-- GET --');
      console.log(result);

      if (result.status == 200) {
        this.productItems = result.data;
      }
    },

    // 상품 1건 추가 POST
    async postProduct() {
      // 작업 활성화를 위해 잠시 주석 처리
      // 상품 등록 시 정보란에 불입력시
      // if (
      //   this.editedItem.name.length <= 0 ||
      //   this.editedItem.description <= 0 ||
      //   this.editedItem.price <= 0 ||
      //   this.editedItem.category <= 0
      // ) {
      //   window.alert('모든 정보란을 입력하고 다시 시도해주세요');
      //   return false;
      // }

      const result = await api.post(this.editedItem);
      console.log('-- POST --');
      console.log(result);

      // 정상 처리가 됐다면,
      if (result.status == 200) {
        const newProduct = result.data;
        newProduct.files = [];

        if (this.files && this.files.length > 0) {
          for (let file of this.files) {
            const form = new FormData();
            form.append('data', file); //@RequestPart("data")
            const result = await api.uploadFile(newProduct.id, form);

            newProduct.files.push({
              ...result.data,
            });
          }
        }
        this.productItems.unshift(newProduct);
      }
      this.editedItem = '';
      this.close();
    },

    // 상품 1건 삭제 DELETE
    async removeProduct(item) {
      const result = await api.del(this.editedItem.id);
      console.log('-- DELETE --');
      console.log(result);

      if (result.status == 200) {
        this.productItems.splice(this.productItems.indexOf(item), 1);
        // this.productItems.filter((product) => product.id !== id);
      }
      this.closeDelete();
    },

    // 상품 1건 수정 PUT
    async modiProduct() {
      const result = await api.put(this.editedItem.id);
      console.log('-- PUT --');
      console.log(result);
    },

    editItem(item) {
      this.editedIndex = this.productItems.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item) {
      this.editedIndex = this.productItems.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    // deleteConfirm() {
    //   this.productItems.splice(this.editedIndex, 1);
    //   this.closeDelete();
    // },
    closeDelete() {
      this.dialogDelete = false;
    },
    // save() {
    //   if (this.editedIndex > -1) {
    //     Object.assign(this.productItems[this.editedIndex], this.editedItem);
    //   } else {
    //     console.log(this.editedIndex);
    //     this.productItems.push(this.editedItem);
    //   }
    //   this.close();
    // },
    close() {
      this.dialog = false;
    },
    seeMore(item) {
      console.log(item.files);
    },
  },
};
</script>

<style lang="scss">
table tr td {
  text-align: center;
}

.search-bar {
  width: 30%;
  padding: 0 20px;
  margin-left: auto;
}
</style>
