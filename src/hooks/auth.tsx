'use client';
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function useAuthMiddleware(redirectTo = 'Pages//login') {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('auth_token');
        if (!token) {
            router.push (redirectTo); // Use replace to avoid history stacking
        }
    }, [router, redirectTo]); // Add dependencies

}
