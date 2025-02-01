See https://rfui-docs.onrender.com/

# Updating `rfui.css`

Run the following:

```
npx @tailwindcss/cli -i ./src/rfui-input.css -o ./src/rfui.css
```

# Publishing a new version

To publish new versions, use `npm version`.

```
npm version major
npm version minor
npm version patch
```

Then run `npm publish.
