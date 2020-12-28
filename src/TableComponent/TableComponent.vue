<template>

  <div>
    <div id="labels_overview_table">
<!--      <v-card-title>-->
<!--        &lt;!&ndash;            {{$t('multilingual-admin.label.title')}}&ndash;&gt;-->
<!--        <v-row>-->
<!--          <v-col class="d-flex" cols="6">-->
<!--            <datatable-filter-->
<!--                :selected.sync="filterOneResults"-->
<!--                :options="filterOneOptions"-->
<!--            ></datatable-filter>-->
<!--          </v-col>-->

<!--          <v-col class="d-flex" cols="4">-->
<!--            <datatable-search :search-input.sync="searchInput"></datatable-search>-->
<!--          </v-col>-->
<!--        </v-row>-->
<!--      </v-card-title>-->

<!--      <v-data-table-->
<!--          :headers="headers"-->
<!--          :items="datatableValues"-->
<!--          :search="searchData"-->
<!--          :custom-filter="filter"-->
<!--          :items-per-page="10"-->
<!--          :item-key="datatableKeyField"-->
<!--          single-select-->
<!--          class="elevation-1"-->
<!--          show-expand-->
<!--      >-->
<!--          <template v-slot:item.actions="{ item }">-->
<!--            <button-delete v-show="allowDelete" :item="item" @deleteItem="deleteAgreed(item)">-->
<!--              <template v-slot:delete-preview>-->
<!--                {{item.ip}}-->
<!--&lt;!&ndash;                implement in child&ndash;&gt;-->
<!--                {{getDeletePreview(item)}}-->
<!--                </template>-->
<!--            </button-delete>-->
<!--          </template>-->

<!--      </v-data-table>-->
    </div>


<!--    <v-data-table-->
<!--        :headers="[-->
<!--                  { text: '', value: 'ip'},-->
<!--                  { text: '', value: 'actions', sortable: false },-->
<!--              ]"-->
<!--        :items="project.ip_whitelist"-->
<!--        :items-per-page="10"-->
<!--        class="elevation-1"-->
<!--    >-->
<!--      <template v-slot:item.actions="{ item }">-->

<!--        <button-delete :item="item" @deleteItem="deleteAgreed(item)">-->
<!--          <template v-slot:delete-preview>-->
<!--            {{item.ip}}-->
<!--          </template>-->
<!--        </button-delete>-->

<!--      </template>-->

<!--    </v-data-table>-->
  </div>
</template>


<script>
import Datatable from '../Datatable/Datatable.vue';
import DatatableFilter from '../Datatable/DatatableFilter.vue';
import DatatableSearch from '../Datatable/DatatableSearch.vue';

import ButtonDelete from '../Buttons/ButtonDelete.vue';

export default {
  extends: Datatable,

  components: {
    DatatableFilter,
    DatatableSearch,
    ButtonDelete,
  },

  props: {
      title: {
        type: String,
      },
      datatableValues: {
        type: Array,
      },
      filterMethods: {
        type: Array,
      },

  },

  data() {
    return {
      headers: null,
      datatableKeyField: 'id',

      filterOneResults: null,
      filterOneOptions: ['blasck','green', 'blueish'],

      allowDelete : true,
    };
  },

  created() {
    this.setHeaders();
  },

  methods: {
    //
    // getDeletePreview(item) {              // CHILD IMPLEMENTATION
    //   return "SDFfdsfdsfsd: " + item.ip;
    // },


    // setHeaders() {                // CHILD IMPLEMENTATION
    //   this.headers = [
    //     {
    //       // text: this.$t('multilingual-admin.label.group'),
    //       text: 'ip',
    //       value: 'ip',
    //     },
    //     {
    //       // text: this.$t('multilingual-admin.label.group'),
    //       text: '',
    //       value: 'actions',
    //       sortable: false,
    //     },
    //     {
    //       text: 'd',
    //       value: 'dummy',
    //       class: 'hidden',
    //       width: '1px',
    //       align: ' d-none',
    //     } /* add dummy column to be able to additional default filtering on status */,
    //   ];
    // },

    // hasFilter() {
    //   // if (this.methodSelected || this.filterWithoutPermissions) {
    //   //   return true;
    //   // }
    //
    //
    //   return true;
    // },
    //
    // applyFilters(item) {
    //   // must be implemented in child
    //
    //   // if (item.methods.search(this.methodSelected) === -1) {
    //   //   return false;
    //   // }
    //
    //   if (this.filterOneResults ==='green' && item.ip !== "127.0.0.1") {
    //     return false;
    //   }
    //   return true;
    // },
    //
    // updateProject() {
    //   this.isSaving = true;
    //   const successUrl = this.route('user.multilingual.projects.show', [this.project.xid, this.toLang]);
    //   const updateUrl = this.route('api.v1.user.multilingual.projects.update', this.project.xid);
    //
    //   const data = {
    //     project_name: this.projectName,
    //   };
    //
    //   const _this = this;
    //   this.$http
    //       .put(updateUrl, data)
    //       .then(() => {
    //         window.location.href = successUrl;
    //       })
    //       .catch((error) => {
    //         _this.apiErrors = error.response.data.errors;
    //         _this.isSaving = false;
    //       })
    //       .finally(() => {
    //
    //       })
    // },
    //
    // deleteAgreed(item) {
    //   this.table.values = this.deleteItemFromTable(this.table.values, item, 'xid');
    //   this.deleteModal = false;
    //   this.deleteItem(item);
    // },
    //
    // deleteItem(item) {
    //   return;
    //   this.clearformResult();
    //   this.form.state.isSubmittingRemove = true;
    //
    //   const url = this.route('api.v1.admin.users.terms.delete', item.xid);
    //
    //   this.$http
    //       .delete(url)
    //       .then((response) => {
    //         if (response.data.success) {
    //           this.form.messages.success = response.data.message;
    //         } else {
    //           this.form.messages.error = response.data.message;
    //           this.table.values = this.restoreTable();
    //         }
    //       })
    //       .catch((error) => {
    //         this.table.values = this.restoreTable();
    //         this.form.messages.error = error.response.data.message;
    //       })
    //       .finally(() => {
    //         this.form.state.isSubmittingRemove = false;
    //       });
    // },
  },

}
</script>

