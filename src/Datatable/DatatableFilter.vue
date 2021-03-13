<template>
  <div>
    <v-select
      :items="options"
      item-text="name"
      item-value="key"
      :label="$t('bedrock-core.action.select')"
      :append-icon="'fal fa-backspace'"
      @click:append="reset"
      persistent-hint
      return-object
      single-line
      v-model="selected"
    >
    </v-select>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
    },
  },

  data() {
    return {
      selected: '',
    };
  },

  watch: {
    selected() {
      this.$emit('update:selected', this.selected);

      window.setTimeout(() => {
        this.$emit('changed');
      }, 0);
    },
  },

  methods: {
    reset() {
      this.selected = '';
    },
  },
};
</script>
