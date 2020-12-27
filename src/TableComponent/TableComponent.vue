<template>

  <div>
    <div id="labels_overview_table">
      <v-card-title>
        <!--            {{$t('multilingual-admin.label.title')}}-->
        <v-row>
          <v-col class="d-flex" cols="6">
            <datatable-filter
                :selected.sync="filterOneResults"
                :options="filterOneOptions"
            ></datatable-filter>
          </v-col>

          <v-col class="d-flex" cols="4">
            <datatable-search :search-input.sync="searchInput"></datatable-search>
          </v-col>
        </v-row>
      </v-card-title>

      <v-data-table
          :headers="headers"
          :items="datatableValues"
          :search="searchData"
          :custom-filter="filter"
          :items-per-page="10"
          :item-key="datatableKeyField"
          single-select
          class="elevation-1"
          show-expand
      >
      </v-data-table>
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

export default {
  extends: Datatable,

  components: {
    DatatableFilter,
    DatatableSearch,
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
    };
  },

  created() {
    this.setHeaders();
   // this.datatableKeyField = "ip"
  },

  methods: {
    setHeaders() {
      this.headers = [
        {
          // text: this.$t('multilingual-admin.label.group'),
          text: 'ip',
          value: 'ip',
        },
        {
          text: 'd',
          value: 'dummy',
          class: 'hidden',
          width: '1px',
          align: ' d-none',
        } /* add dummy column to be able to additional default filtering on status */,
      ];
    },

    hasFilter() {
      // if (this.methodSelected || this.filterWithoutPermissions) {
      //   return true;
      // }


      return true;
    },

    applyFilters(item) {
      // if (item.methods.search(this.methodSelected) === -1) {
      //   return false;
      // }

      if (this.filterOneResults ==='green' && item.ip !== "127.0.0.1") {
        return false;
      }
      return true;
    },

    updateProject() {
      this.isSaving = true;
      const successUrl = this.route('user.multilingual.projects.show', [this.project.xid, this.toLang]);
      const updateUrl = this.route('api.v1.user.multilingual.projects.update', this.project.xid);

      const data = {
        project_name: this.projectName,
      };

      const _this = this;
      this.$http
          .put(updateUrl, data)
          .then(() => {
            window.location.href = successUrl;
          })
          .catch((error) => {
            _this.apiErrors = error.response.data.errors;
            _this.isSaving = false;
          })
          .finally(() => {

          })
    },

    deleteAgreed(item) {
      this.table.values = this.deleteItemFromTable(this.table.values, item, 'xid');
      this.deleteModal = false;
      this.deleteItem(item);
    },

    deleteItem(item) {
      return;
      this.clearformResult();
      this.form.state.isSubmittingRemove = true;

      const url = this.route('api.v1.admin.users.terms.delete', item.xid);

      this.$http
          .delete(url)
          .then((response) => {
            if (response.data.success) {
              this.form.messages.success = response.data.message;
            } else {
              this.form.messages.error = response.data.message;
              this.table.values = this.restoreTable();
            }
          })
          .catch((error) => {
            this.table.values = this.restoreTable();
            this.form.messages.error = error.response.data.message;
          })
          .finally(() => {
            this.form.state.isSubmittingRemove = false;
          });
    },
  },

}
</script>


<style scoped>
/*!* Hard hide the column of the DUMMY data *!*/
/*::v-deep .v-data-table__wrapper thead tr th:nth-of-type(7) {*/
/*    display:none;*/
/*}*/
/*::v-deep .v-data-table__wrapper tr td:nth-of-type(7) {*/
/*    display:none;*/
/*}*/

::v-deep .v-data-table__wrapper thead tr th.hidden {
  display: none;
}

::v-deep .v-card__title.danger {
  background-color: red;
}

::v-deep tr.v-data-table__selected {
  background: #7d92f5 !important;
}

::v-deep tr.v-data-table__expanded__content {
  background: #c2c0c2 !important;
  border: none !important;
  box-shadow: none !important;
}
</style>
