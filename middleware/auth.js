export default function({ store, error }) {
  // export default function({ store, redirect, error }) {
  // If user not connected, redirect to /
  if (!store.state.authUser) {
    // return redirect('/auth/login');
    error({
      message: 'You are not authorized',
      statusCode: 403
    });
  }
}
