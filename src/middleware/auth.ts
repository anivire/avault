export default defineNuxtRouteMiddleware(async (to, from) => {
    const user = useSupabaseUser();
    const router = useRouter();

    if (user.value && to.fullPath == '/profile/settings' && process.server) {
        // return navigateTo(to.fullPath);
        router.go(1);
    } else if (!user.value && to.fullPath == '/profile/settings' && process.server) {
        return navigateTo('/');
    }
})