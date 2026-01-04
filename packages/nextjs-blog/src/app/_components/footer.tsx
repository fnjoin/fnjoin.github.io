import React from "react";
import Container from "@/app/_components/container";
import RSSIcon from "@/app/_components/rss-icon";
import CookieSettingsLink from "@/components/cookie-settings-link";

export function Footer() {
    const currentYear = new Date().getFullYear();
    const yearRange = currentYear > 2020 ? `2020-${currentYear}` : "2020";

    return (
        <footer className="bg-neutral-50 border-t border-neutral-200">
            <Container>
                <div className="py-14 flex flex-col lg:flex-row items-center">
                    <h3 className="tracking-tighter leading-tight text-center lg:text-left mb-10 lg:mb-0 lg:pr-4 lg:w-1/2">
                        &copy; {yearRange} The Authors
                    </h3>
                    <div className="flex flex-col lg:flex-row justify-center items-center lg:pl-4 lg:w-1/2">
                        <span className="mx-3 bg-black hover:bg-white hover:text-black border border-black text-white font-bold py-3 px-12 lg:px-8 duration-200 transition-colors mb-6 lg:mb-0">
                            Thank you for reading.
                        </span>
                    </div>
                    <div className="flex flex-col lg:flex-row justify-center items-center lg:pl-4 lg:w-1/2">
                        Views and opinions expressed by the authors are solely
                        their own and are not the views of their employers.
                    </div>
                    <div className="flex justify-center lg:justify-end lg:pl-4 mt-4 lg:mt-0 space-x-4">
                        <RSSIcon />
                        <CookieSettingsLink />
                    </div>
                </div>
            </Container>
        </footer>
    );
}

export default Footer;
