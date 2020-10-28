# ProximaX Supercontracts TS SDK
Official ProximaX Supercontracts SDK Library in TypeScript lang.

[AssemblyScript](https://www.assemblyscript.org "AssemblyScript") is used to create a supercontract from TS. But it still is not fully typescript. Some feature not available. About that you can read [here](https://github.com/AssemblyScript/website/blob/master/src/basics.md).

## Write your own contract
1. Init a new project via npm.
```
npm init
```

2. Install AssemblyScript like dependency.
```
npm install --save @assemblyscript/loader
npm install --save-dev assemblyscript
```

3. Init a new AssemblyScript's project.
```
npx asinit .
```

4. Install supercontract sdk. 
> **_NOTE:_** The `tx-xpx-supercontract-sdk` package is not being published to the npmjs registry. That's why you need to add the repository as a dependency directly from git.

```
npm install https://github.com/proximax-storage/ts-xpx-supercontract-sdk
```

5. Now you can write your contract in `assembly/index.ts`. For example something like this:
```typescript
// The entry file of your WebAssembly module.
import { utils, Status } from "ts-xpx-supercontract-sdk"

export function helloworld(): i64 {
  let n : usize = 99;
  let result = utils.ping(n);
  utils.debug("Hello world " + result.toString());

  return Status.Success;
}
```