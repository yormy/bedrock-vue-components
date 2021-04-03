<template>
  <v-card class="datatable">
    <datatable-header
      :messages="form.messages"
      :subtitle="$t('bedrock-core.blacklisted_ip.index.description')"
      :title="$t('bedrock-core.blacklisted_ip.index.title')"
    >
      <template v-slot:search>
        <datatable-search :search-input.sync="searchInput"></datatable-search>
      </template>
    </datatable-header>

    <v-data-table
      :headers="headers"
      :items="table.values"
      :search="searchData"
      class="elevation-1"
      item-key="xid"
      single-select
    >
      <template v-slot:[`item.actions`]="{ item }">
        <button-delete :item="item" @deleteItem="deleteAgreed(item)">
          <template v-slot:delete-preview>{{ item.ip_address }}</template>
        </button-delete>
      </template>
    </v-data-table>

    <datatable-footer>
      <template v-slot:buttons>
        <button-add-modal
          :description="$t('bedrock-core.blacklisted_ip.create.description')"
          :header="$t('bedrock-core.blacklisted_ip.create.title')"
          :isLoading="form.state.isSubmittingAdd"
          :re-show-modal="reShowModal"
          @addItem="addItem"
        >
          <template v-slot:form>

            <v-textarea
              v-model="formAdd.ip_address"
              :color="!form.api.errors.ip_address && formAdd.ip_address ? 'success' : ''"
              :error-messages="form.api.errors.ip_address ? form.api.errors.ip_address : ''"
              :label="$t('bedrock-core.general.ip_address')"
              :name="$t('bedrock-core.general.ip_address')"
              rows="1"
            ></v-textarea>
            <v-textarea
              v-model="formAdd.comment"
              :label="$t('bedrock-core.general.comment')"
              :name="$t('bedrock-core.general.comment')"
            ></v-textarea>
          </template>
        </button-add-modal>
      </template>
    </datatable-footer>

  </v-card>
</template>

<script>
import ButtonDelete from '../Buttons/ButtonDelete.vue';
import ButtonAddModal from '../Buttons/ButtonAddModal.vue';
import Datatable from '../Datatable/Datatable.vue';
import DatatableHeader from '../Datatable/DatatableHeader.vue';
import DatatableFooter from '../Datatable/DatatableFooter.vue';
import DatatableSearch from '../Datatable/DatatableSearch.vue';


export default {
  extends: Datatable,

  components: {
    ButtonDelete,
    ButtonAddModal,
    DatatableHeader,
    DatatableFooter,
    DatatableSearch,
  },

  props: {
    title: {
      type: String,
    },

    datatableValues: {
      type: Array,
    },
  },

  data() {
    return {
      headers: null,
      searchInput: null,

      reShowModal: false,

      table: {
        values: this.datatableValues,
      },

      formAdd: {
        ip: '',
        comment: '',
      },

      form: {
        state: {
          isSubmittingAdd: false,
          isSubmittingRemove: false,
        },

        messages: {
          success: '',
        },

        api: {
          message: '',
          errors: {}
        },
      },

      urls: {
        blacklistIpDelete: this.route('api.v1.admin.system.blacklist.ip.delete'),
        blacklistIpAdd: this.route('api.v1.admin.system.blacklist.ip.add'),
      },
    };
  },

  created() {
    this.createHeaders();
  },

  methods: {
    createHeaders() {
      this.headers = [];

      this.headers.push(
        {
          text: this.$t('bedrock-core.general.ip_address'),
          value: 'ip_address',
        },
        {
          text: this.$t('bedrock-core.general.comment'),
          value: 'comment',
        },
        {
          text: this.$t('bedrock-core.blacklisted_ip.field.blacklisted_by.label'),
          value: 'blacklisted_by',
        },
        {
          text: this.$t('bedrock-core.general.since'),
          value: 'created_at',
        },
        {
          text: '',
          value: 'actions',
          sortable: false,
        },
        {
          text: 'd',
          value: 'dummy',
          class: 'hidden',
          width: '1px',
          align: ' d-none',
        } /* add dummy column to be able to additional default filtering on status */,
      );
    },

    addItem() {
      this.clearformResult();
      this.form.state.isSubmittingAdd = true;

      const payload = this.formAdd;

      this.$http
        .post(this.urls.blacklistIpAdd, payload)
        .then(response => {
          if (response.data.success) {
            this.table.values = this.addItemToTable(this.table.values, response.data.data.item);
            this.form.messages.success = response.data.message;
            this.formAdd = {};
          } else {
            this.form.messages.error = response.data.message;
          }
        })
        .catch(error => {
          this.reShowModal = !this.reShowModal; // just triggering the reshowing
          this.form.api.message = error.response.data.message;
          this.form.api.errors = error.response.data.errors;
        })
        .finally(() => {
          this.form.state.isSubmittingAdd = false;
        });
    },

    deleteAgreed(item) {
      this.table.values = this.deleteItemFromTable(this.table.values, item, 'xid');
      this.deleteModal = false;
      this.deleteItem(item);
    },

    deleteItem(item) {
      this.clearformResult();
      this.form.state.isSubmittingRemove = true;

      const payload = {
        xid: item.xid,
      };

      this.$http
        .delete(this.urls.blacklistIpDelete, {data: payload})
        .then(response => {
          if (response.data.success) {
            this.form.messages.success = response.data.message;
          } else {
            this.form.messages.error = response.data.message;
            this.table.values = this.restoreTable();
          }
        })
        .catch(error => {
          this.table.values = this.restoreTable();
          this.form.messages.error = error.response.data.message;
        })
        .finally(() => {
          this.form.state.isSubmittingRemove = false;
        });
    },

    clearformResult() {
      this.form.messages.success = '';
      this.form.messages.error = '';
    },
  },
};
</script>
