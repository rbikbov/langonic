export default ({ store, redirect }) => {
  if (store.state.authUser) {
    redirect('/');
  }
};
