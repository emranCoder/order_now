import React from "react";
import { FaFacebookF } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaSlackHash } from "react-icons/fa";

export default function Footer() {
  return (
    <div className="container-fluid mt-5 lg:mb-0 max-sm:mb-9  md:mb-9">
      <div className="container-row">
        <footer className="footer p-10 bg-slate-800 text-neutral-content">
          <nav>
            <h6 className="footer-title">Services</h6>
            <a className="link link-hover">Branding</a>
            <a className="link link-hover">Design</a>
            <a className="link link-hover">Marketing</a>
            <a className="link link-hover">Advertisement</a>
          </nav>
          <nav>
            <h6 className="footer-title">Company</h6>
            <a className="link link-hover">About us</a>
            <a className="link link-hover">Contact</a>
            <a className="link link-hover">Jobs</a>
            <a className="link link-hover">Press kit</a>
          </nav>
          <nav>
            <h6 className="footer-title">Legal</h6>
            <a className="link link-hover">Terms of use</a>
            <a className="link link-hover">Privacy policy</a>
            <a className="link link-hover">Cookie policy</a>
          </nav>
        </footer>
        <footer className="footer p-10 bg-slate-800 text-neutral-content">
          <aside className="items-center grid-flow-col">
            <FaSlackHash className="text-[35px]" />
            <p>
              OrderNow <br />
              Developed by{" "}
              <a target="_blank" href="http://github.com/emrancoder">
                emranCoder
              </a>
            </p>
          </aside>
          <nav className="md:place-self-center md:justify-self-end">
            <div className="grid grid-flow-col gap-4 text-3xl">
              <a>
                <FaFacebookF />
              </a>
              <a>
                <FaYoutube />
              </a>
              <a>
                <FaInstagram />
              </a>
            </div>
          </nav>
        </footer>
      </div>
    </div>
  );
}
