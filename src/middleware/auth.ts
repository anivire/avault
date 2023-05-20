export default defineNuxtRouteMiddleware((to) => {
    const user = useSupabaseUser();
    const router = useRouter();

    if (user.value && to.fullPath == '/profile/settings') {
        router.push(to.fullPath);
    } else if (!user.value && to.fullPath == '/profile/settings') {
        router.push('/');
    }
})