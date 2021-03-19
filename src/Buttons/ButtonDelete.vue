<template>
  <div>
    <v-dialog v-model="deleteModal" max-width="290">
      <v-card>
        <slot name="modal">
          <v-card-title class="red headline">{{ title }}</v-card-title>

          <v-card-text>
            <slot name="delete-preview"></slot>
          </v-card-text>
        </slot>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="green darken-1" text @click="doCancelled">
            {{ $t('bedrock-core.general.cancel') }}
          </v-btn>

          <v-btn color="red darken-1" text @click="doAgreed">
            {{ confirmButton }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <button-submit :is-loading="isLoading" @clicked="askConfirmation" :btnClass="btnClass">
      <slot name="button-content">
        <span class="fal fa-fw fa-trash"></span>
        <span v-if="showText">{{ $t('bedrock-core.general.delete') }}</span>
      </slot>
    </button-submit>
  </div>
</template>

<script>
import ButtonSubmit from './ButtonSubmit.vue';

export default {
  components: {
    ButtonSubmit,
  },

  props: {
    item: {
      type: Object,
      required: true,
    },

    titleText: {
      type: String,
      required: false,
    },

    confirmButtonText: {
      type: String,
      required: false,
    },

    iconAppend: {
      type: String,
    },

    disabled: {
      type: Boolean,
    },

    isLoading: {
      type: Boolean,
    },

    showText: {
      type: Boolean,
      default: false,
    },

    btnClass: {
      type: String,
      default: 'btn btn-danger',
    },
  },

  data() {
    return {
      deleteModal: false,

      title : this.titleText ? this.titleText : this.$t('bedrock-core.general.delete'),
      confirmButton : this.confirmButtonText ? this.confirmButtonText : this.$t('bedrock-core.general.delete'),
    };
  },

  methods: {
    askConfirmation() {
      this.deleteModal = true;
    },

    doCancelled() {
      this.deleteModal = false;
    },

    doAgreed() {
      this.deleteModal = false;
      this.$emit('deleteItem', this.item);
    },

  },
};
</script>

<style scoped></style>
