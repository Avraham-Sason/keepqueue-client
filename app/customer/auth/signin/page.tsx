import { SignInForm } from "@/app/business/auth/signin/signin-form";

export default function CustomerSignInPage() {
    return (
        <div className="h-screen w-full center">
            <SignInForm type="customer" />
        </div>
    );
}
