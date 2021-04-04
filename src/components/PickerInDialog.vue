<template>
  <v-row>
    <v-col>
      <v-dialog
        ref="dialog"
        v-model="modal"
        :return-value.sync="date"
        width="290px"
        app
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            class="pt-0 pt-2"
            v-model="date"
            prepend-icon="mdi-calendar"
            readonly
            dense
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="date" scrollable>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="modal = false"> 취소 </v-btn>
          <v-btn text color="primary" @click="pickerDate()"> 확인 </v-btn>
        </v-date-picker>
      </v-dialog>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "PickerInDialog",
  props: ['fromDate', 'toDate'],
  data: () => ({
    date: new Date().toISOString().substr(0, 10),
    menu: false,
    modal: false,
    menu2: false,
  }),
  methods: {
    pickerDate() {
      this.$refs.dialog.save(this.date);
      this.$emit("pickerDate", this.date);
    },
  },
};
</script>
<style scoped>
.v-text-field {
  width: 120px;
}
</style>