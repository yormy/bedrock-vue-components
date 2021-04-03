<template>
  <div>
    <v-dialog v-model="deleteModal" max-width="290">
      <v-card>
        <slot name="modal">
          <v-card-title :class="colorFormType()" class="headline">
            <div class="text-white">
              {{ headerText }}
            </div>
          </v-card-title>

          <v-card-text>
            <h3>{{ title }} </h3>
            <p>{{ description }}</p>
            <slot name="message"></slot>

          </v-card-text>
        </slot>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text @click="doCancelled">
            {{ $t('bedrock-core.general.cancel') }}
          </v-btn>

          <v-btn :color="colorFormType()" text @click="doConfirmed">
            {{ confirmButtonText }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <button-submit :btnClass="btnClass" :is-loading="isLoading" @clicked="askConfirmation">
      <slot name="button-content">
        [specify the text on the button]
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
    header: {
      type: String,
      required: false,
    },

    title: {
      type: String,
      required: false,
    },

    description: {
      type: String,
      required: false,
    },

    item: {
      type: Object,
      required: true,
    },

    confirmButton: {
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
      required: true
    },

    actionType: {
      type: String,
      default: 'success'
    }
  },

  data() {
    return {
      deleteModal: false,

      colorName: this.colorFormType(),

      headerText: this.header ? this.header : this.$t('bedrock-core.general.delete'),
      confirmButtonText: this.confirmButton ? this.confirmButton : this.$t('bedrock-core.general.delete'),
    };
  },

  methods: {
    colorFormType() {
      if (this.actionType === 'success') {
        return 'success';
      }
      if (this.actionType === 'danger') {
        return 'red';
      }
      if (this.actionType === 'info') {
        return 'primary';
      }
    },

    askConfirmation() {
      this.deleteModal = true;
    },

    doCancelled() {
      this.deleteModal = false;
    },

    doConfirmed() {
      this.deleteModal = false;
      this.$emit('confirmed', this.item);
    },

  },
};
</script>

<style scoped></style>
