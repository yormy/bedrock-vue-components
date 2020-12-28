<template>
  <div>
    <v-dialog v-model="addModal" max-width="290">
      <v-card>
        <slot name="modal">
          <v-card-title class="red headline">{{ $t('misc.add') }}</v-card-title>

          <v-card-text>
            <slot name="form"></slot>
          </v-card-text>
        </slot>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="green darken-1" text @click="doCancelled">
            {{ $t('misc.cancel') }}
          </v-btn>

          <v-btn color="green darken-1" text @click="doAddItem">
            {{ $t('misc.add') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <button-submit :is-loading="isLoading" @clicked="showForm" :btn-class="btnClass">
      <slot name="button-content">
        <span class="fal fa-plus"></span>
        <span v-if="withText">
          {{ $t('misc.add') | capatalizeFirst }}
        </span>
      </slot>
    </button-submit>
  </div>
</template>

<script>
export default {
  props: {
    iconAppend: {
      type: String,
    },

    disabled: {
      type: Boolean,
    },

    isLoading: {
      type: Boolean,
    },

    withText: {
      type: Boolean,
      default: false
    },

    btnClass : {
      type: String,
    }
  },

  data() {
    return {
      addModal: false,
    };
  },

  methods: {
    showForm() {
      this.addModal = true;
    },

    doCancelled() {
      this.addModal = false;
    },

    doAddItem() {
      this.addModal = false;
      this.$emit('addItem');
    },
  },
};
</script>

<style scoped></style>
