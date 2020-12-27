<script>
export default {
  props: {
    caseSensitive: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      headers: null,
      searchInput: null,

      backupTable: {
        values: null,
      },

      form: {
        state: {
          isSubmittingAdd: false,
          isSubmittingRemove: false,
        },

        messages: {
          success: '',
          error: '',
        },
      },
    };
  },

  computed: {
    searchData() {
      if (this.searchInput === '' || !this.searchInput) {
        return '@';
      }
      return this.searchInput;
    },
  },

  methods: {
    addItemToTable(values, item) {
      return values.push(item);
    },

    deleteItemFromTable(values, item, findOn) {
      this.backupTable.values = JSON.parse(JSON.stringify(values));
      const foundIndex = this.findIndex(values, item, findOn);

      const copy = JSON.parse(JSON.stringify(values));
      copy.splice(foundIndex, 1);
      return copy;
    },

    restoreTable() {
      return this.backupTable.values;
    },

    checkFilters(item) {
      if (!this.hasFilter()) {
        return true;
      }
      return this.applyFilters(item);
    },

    searchCase(value, search) {
      if (this.caseSensitive) {
        return this.searchCaseSensitive(value, search);
      }
      return this.searchCaseInsensitive(value, search);
    },

    searchCaseInsensitive(value, search) {
      return value.toString().toLocaleUpperCase().indexOf(search.toLocaleUpperCase()) !== -1;
    },

    searchCaseSensitive(value, search) {
      return value.indexOf(search) !== -1;
    },

    filter(value, search, item) {
      if (!this.hasFilter) {
        return (
          value !== null &&
          search !== null &&
          typeof value === 'string' &&
          this.searchCase(value, search)
        );
      }

      if (search === null || search === '') {
        return value !== null && typeof value === 'string' && this.checkFilters(item);
      }

      return (
        value !== null &&
        search !== null &&
        typeof value === 'string' &&
        this.checkFilters(item) &&
        this.searchCase(value, search)
      );
    },

    findIndex(datatable, item, findOn) {
      if (findOn === undefined) {
        /*eslint-disable */
        console.error('no search key specified');
        /* eslint-enable */
      }

      let foundIndex = -1;
      datatable.forEach((value, index) => {
        if (value[findOn] === item[findOn]) {
          foundIndex = index;
        }
      });
      return foundIndex;
    },

    clearformResult() {
      this.form.messages.success = '';
      this.form.messages.error = '';
    },
  },
};
</script>
