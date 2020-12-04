# Bedrock Vue Component


# Build
```
npm run build
```

# Publish
Make account on https://www.npmjs.com
```
npm publish
```

# Use Locally
```
npm i -D ../bedrock-vue-components
```

# Use Npm version
```
npm i -D yormy-bedrock-vue-components
```

# Using the components
```
import { HelloComponent } from "bedrock-vu--component";

components: {
    HelloComponent
}
  
```

# Typescript
``` 
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { SampleComponent } from "vue-component-library";

@Component({
  components: {
    SampleComponent
  }
})
export default class App extends Vue {}
</script>
```
