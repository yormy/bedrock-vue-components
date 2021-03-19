<template>
  <div class="d-flex justify-content-between">
    <div>
      <div class="table_title">{{title}}</div>
      <div v-if="subtitle" class="table_subtitle">{{subtitle}}</div>
    </div>
    <div>
      <div v-if="messages && messages.success" class="table_message success">
        {{ messages.success }}
      </div>
      <div v-if="messages && messages.error" class="table_message danger">
        {{ messages.error }}
      </div>
      <div v-if="messages && messages.warning" class="table_message warning">
        {{ messages.warning }}
      </div>
    </div>
    <div class="tablesearch">
      <slot name="search"></slot>
    </div>
  </div>
</template>

<script>
import DatatableSearch from './DatatableSearch.vue';

export default {
  components: {
    DatatableSearch,
  },

  props: {
    title: {
      type: String,
      required: false,
    },

    subtitle: {
      type: String,
      required: false,
    },

    messages: {
      type: Object,
      required: false,
    },
  },
}

</script>
