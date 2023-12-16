import app from './app.js';
import { initialModel } from './config/database/associations.js';
import { authenticated, syncUp } from './config/database/database.js';
import { envs } from './config/enviroments/enviroments.js';

async function main() {
   try {
      await authenticated();
      initialModel();
      await syncUp();
   } catch (error) {
      console.error(error);
   }
}

main();

app.listen(envs.PORT, () => {
   console.log(`Server running on port: ${envs.PORT}`);
});
