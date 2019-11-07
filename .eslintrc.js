module.exports = {
  root: true,
  env: {
    node: true
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"]
      }
    }
  },

  extends: ["plugin:vue/essential", "@vue/airbnb"],
  rules: {
    quotes: ["error", "double"],
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "import/prefer-default-export": "off",
    "import/no-default-export": "true",
    "comma-dangle": ["error", "never"],
    "no-param-reassign": 0,
    "max-len": 0
  },
  parserOptions: {
    parser: "babel-eslint"
  },
  overrides: [
    {
      files: ["**/__tests__/*.{j,t}s?(x)", "**/tests/unit/**/*.spec.{j,t}s?(x)"],
      env: {
        jest: true
      }
    }
  ]
};
