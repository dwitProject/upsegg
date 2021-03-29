<template>
  <div class="flex">
    <AdminNav />
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
                      <v-col cols="6">
                        <v-text-field
                          color="#000"
                          label="상품금액"
                          dense
                          v-model="editedItem.price"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="6">
                        <v-select
                          color="#000"
                          :items="['0-17', '18-29', '30-54', '54+']"
                          label="카테고리"
                          dense
                          require
                          v-model="editedItem.category"
                        ></v-select>
                      </v-col>
                      <v-col cols="12">
                        <v-file-input
                          color="#000"
                          truncate-length="15"
                          dense
                          v-model="editedItem.files"
                        ></v-file-input>
                      </v-col>
                    </v-row>
                  </v-container>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" depressed @click="save">등록</v-btn>
                    <v-btn color="error" depressed @click="close">취소</v-btn>
                  </v-card-actions>
                </v-card-text>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="headline"
                  >{{ editedItem.productName }}를(을)
                  삭제하시겠습니까?</v-card-title
                >
                <v-spacer></v-spacer>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" depressed @click="deleteConfirm"
                    >확인</v-btn
                  >
                  <v-btn color="error" depressed @click="closeDelete"
                    >취소</v-btn
                  >
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
        <template v-slot:[`item.modiOrDel`]="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
          <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
        </template>
      </v-data-table>
    </v-main>
  </div>
</template>

<script>
import AdminNav from '../../components/AdminNav';
import api from '../../api/product';

export default {
  name: 'productMng',
  components: {
    AdminNav,
  },
  data: () => ({
    search: '',
    dialog: false,
    dialogDelete: false,
    headers: [
      { text: '상품명', value: 'name' },
      { text: '상품설명', value: 'description' },
      { text: '상품금액', value: 'price' },
      { text: '카테고리', value: 'category' },
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
      category: '',
      files: '',
    },
    defaultItem: {
      name: '',
      description: '',
      price: '',
      category: '',
      files: '',
    },
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
    async getProducts() {
      const result = await api.get();
      console.log(result);
      console.log(result.data);

      if (result.status == 200) {
        this.productItems = result.data;
      }
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
    deleteConfirm() {
      this.productItems.splice(this.editedIndex, 1);
      this.closeDelete();
    },
    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.productItems[this.editedIndex], this.editedItem);
      } else {
        this.productItems.push(this.editedItem);
      }
      this.close();
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
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

.flex {
  display: flex;
}
</style>
