<template>
  <div>
    <v-dialog v-model="deleteModal" max-width="290">
      <v-card>
        <slot name="modal">
          <v-card-title class="red headline">{{ capatalize($t('actions.delete')) }}</v-card-title>

          <v-card-text>
            <slot name="delete-preview"></slot>
          </v-card-text>
        </slot>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="green darken-1" text @click="doCancelled">
            {{ capatalize($t('misc.cancel')) }}
          </v-btn>

          <v-btn color="red darken-1" text @click="doAgreed">
            {{ capatalize($t('misc.delete')) }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <button-submit :is-loading="isLoading" @clicked="askConfirmation" :btnClass="btnClass">
      <slot name="button-content">
        <span class="fal fa-fw fa-trash"></span>
        <span v-if="showText">{{ capatalize($t('misc.delete')) }}</span>
      </slot>
    </button-submit>
  </div>
</template>

<script>
import { capatalizeFirst } from '../Scripts/Filters.js';
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

    capatalize(message) {
      return capatalizeFirst(message);
    },
  },
};
</script>

<style scoped></style>
