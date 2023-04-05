<!-- @format -->

# Nova Hub Monorepo

This repo is a monorepo for our Nova Entertainment APIs and the Nova Hub (Management Console) used internally within Nova to manage our APIs. All our websites and mobile apps get their data from the APIs exposed by this monorepo and hence the name **HUB**.
The structure is as folows:

```
/
  package.json
  lerna.json
  seed.yml
  packages/
    package-name/
      package.json
      index.js
  services/
    service-name/
      package.json
      sst.json
      lambdas/
        index.js
      stacks/
        index.js
      test/
        sample.test.js
      shared/
        index.js
```

We are using yarn workspaces. So all dependencies are hoisted at the root in `/node_modules`. No other `node_modules` directory will/should be present in any of the other packages in our repo. We are using Lerna for managing different packages in our monorepo and their dependencies. Each service is it's own package.

-   `/packages`: These are internal packages that are used in our services. Each contains a package.json and can be optionally published to npm.
-   `/services/shared`: Any common code that you might not want to maintain as a package. Does NOT have a package.json.
-   `/services/service-name/stacks`: This is where the CDK code for your service lives. It defines the infrastructure particular service.
-   `services/service-name/sst.json`: This is where your SST service config lives.
-   `/seed.yml`: This is where your any of the config for your monorepo's CI/CD lives.
-

# Services

Each service is a collection of Lambda functions with a similar purpose. They are meant to be managed on their own. They each have their own `package.json` and the versions of the dependencies should be kept separate from the other services.

# Packages

Since each package has its own `package.json`, you can manage it just like you would any other npm package.
To add a new package:

```
$ mkdir /packages/new-package
$ yarn init
```

Note that packages should be added by specifying the version number declared in their package.json. Otherwise, Yarn tries to find the dependency in the registry.

# Shared

If you need to add any other common code in your repo that won’t be maintained as a package, add it to the `shared` directory. It does not contain a `package.json`. This means that you’ll need to install any npm packages as dependencies in the root.

To install an npm package at the root.

```
$ yarn add -W some-npm-package
```

While it’s convenient to add all the common code to the `shared`, it has a downside. If a team updates the `shared`, all the services that are dependent on it will need to test this change before deploying. In contrast, a package can be locked to a specific version and can be upgraded when the team chooses to.

# Deploying

## CI/CD Through Seed

[Seed](https://seed.run/) supports deploying SST monorepo projects that use Lerna and Yarn Workspaces out of the box.

Therefore, deployments to stages, `staging` and `prod` should only be done by merging your `feat/fix` branch into `staging` and `main` branches respectively, not by manually running scripts from your codebase.

## Local

To deploy a specific service.

```
$ cd services/service-name
$ yarn start
```

If you're running it for the first time, it'll ask you for a stage name. Use a short and sweet version of your name. This stage is what you'd deploying to using your scripts, if you want to test a deployed version of your app by running `$ yarn run deploy`. For example, I use **ridz** for my stage's name.
When you run the above command SST also creates a debug stack for every stack in your stage. These debug stacks are what being used for your local debugging by SST when you work on your local machine by running `$ yarn start`.
