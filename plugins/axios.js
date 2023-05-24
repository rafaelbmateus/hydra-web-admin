export default function ({ $axios, store, redirect, route, env, app }) {
  $axios.onResponse((response) => {
    return response;
  });
}
