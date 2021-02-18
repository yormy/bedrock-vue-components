import SampleComponent from "./SampleComponent/SampleComponent.vue";
import HelloComponent from "./SampleComponent/HelloComponent.vue";
import Datatable from "./Datatable/Datatable.vue";
import DatatableSearch from "./Datatable/DatatableSearch.vue";
import DatatableFilter from "./Datatable/DatatableFilter.vue";

import ButtonDelete from "./Buttons/ButtonDelete.vue";
import ButtonSubmit from "./Buttons/ButtonSubmit.vue";
import ButtonAddModal from "./Buttons/ButtonAddModal.vue";

import AppearingBullets from "./Misc/AppearingBullets.vue";

// @ts-ignore
import { doLogout, removeTokensUser, removeTokensAdmin, storeTokens } from "./Plugins/loginhelper.js";
// @ts-ignore
import { getLocale } from "./Plugins/locale.js";
// @ts-ignore
import axios from "./Plugins/axios.js";

// @ts-ignore
import emailcheck from "./Plugins/emailcheck.js";

//@ts-ignore
import { mergeErrors, getFirstValidationError } from "./Helpers/formhelper.js";

export {
    SampleComponent,
    HelloComponent,
    Datatable,
    DatatableSearch,
    DatatableFilter,
    ButtonDelete,
    ButtonSubmit,
    ButtonAddModal,
    AppearingBullets,
    doLogout, removeTokensUser, removeTokensAdmin, storeTokens,
    getLocale,
    mergeErrors,
    getFirstValidationError,
    axios,
    emailcheck,
};
