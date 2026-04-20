import { Show, UserButton, useUser } from "@clerk/tanstack-react-start";
import { usePostHog } from "@posthog/react";
import { Link } from "@tanstack/react-router";
import { LogIn } from "lucide-react";
import { useEffect } from "react";

const Navbar = () => {
	const posthog = usePostHog();
	const { user } = useUser();

	useEffect(() => {
		if (user) {
			posthog.identify(user.id, {
				email: user.primaryEmailAddress?.emailAddress,
				name: user.fullName,
			});
		} else {
			posthog.reset();
		}
	}, [user, posthog]);

	return (
		<nav className="navbar">
			<div className="brand">
				<div className="mark">
					<div className="glyph" />
				</div>
				<Link to="/">Skild</Link>
			</div>

			<div className="actions">
				<Show when="signed-in">
					<UserButton />
				</Show>
				<Show when={"signed-out"}>
					<Link
						to="/sign-in/$"
						className="btn-primary"
						onClick={() => posthog.capture("sign_in_clicked")}
					>
						<LogIn size={16} />
						Sign in
					</Link>
				</Show>
			</div>
		</nav>
	);
};

export default Navbar;
