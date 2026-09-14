/**
 * Middleware — Demo Auto-login
 * الديمو بيشتغل تحت /demo — الـ Landing Page على / مش محتاجة auth.
 * أي زيارة على /dashboard القديمة هتتحول تلقائياً لـ /demo/dashboard.
 */
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const DEMO_TOKEN = 'demo-token';

// مسارات لا تحتاج auth
const PUBLIC_PREFIXES = ['/', '/demo/parent'];

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // تجاهل Next.js internals والملفات الثابتة
    if (pathname.startsWith('/_next') || pathname.includes('.')) {
        return NextResponse.next();
    }

    // إعادة التوجيه من /dashboard القديمة → /demo/dashboard (backward compat)
    if (pathname === '/dashboard' || pathname.startsWith('/dashboard/')) {
        const newPath = pathname.replace('/dashboard', '/demo/dashboard');
        return NextResponse.redirect(new URL(newPath, request.url));
    }

    // إعادة التوجيه من /groups, /students, /sessions, /exams, /reports, /assistants القديمة
    const oldRoutes = ['/groups', '/students', '/sessions', '/exams', '/reports', '/assistants', '/parent'];
    const matchedOld = oldRoutes.find(r => pathname === r || pathname.startsWith(r + '/'));
    if (matchedOld) {
        return NextResponse.redirect(new URL(`/demo${pathname}`, request.url));
    }

    // Landing Page (/) — لا تحتاج auth
    if (pathname === '/') {
        return NextResponse.next();
    }

    // /login → ريدايريكت لـ /demo/dashboard مباشرة
    if (pathname === '/demo/login' || pathname === '/login') {
        const res = NextResponse.redirect(new URL('/demo/dashboard', request.url));
        res.cookies.set('token', DEMO_TOKEN, { path: '/', maxAge: 60 * 60 * 24 });
        return res;
    }

    // كل مسارات /demo/* → ضبط الـ cookie تلقائياً
    if (pathname.startsWith('/demo')) {
        const token = request.cookies.get('token')?.value;
        if (token !== DEMO_TOKEN) {
            const res = NextResponse.next();
            res.cookies.set('token', DEMO_TOKEN, { path: '/', maxAge: 60 * 60 * 24 });
            return res;
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
