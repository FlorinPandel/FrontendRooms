import React, { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Filter from "./Filter";

export default function Navigation({ filters, setFilters }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { user, logout } = useAuth() || {};
  const location = useLocation();
  const isHome = location.pathname === "/";

  const handleLogout = () => {
    logout?.();
    setMobileMenuOpen(false);
  };

  return (
    <div className="bg-gray-900">
      {/* Kopfzeile: Logo und Login/Logout */}
      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="flex items-center justify-center p-6 lg:px-8">
          {/* Logo zentriert */}
          <Link to="/" className="flex items-center">
            <img
              alt="Logo"
              src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=200"
              className="h-8 w-auto"
            />
          </Link>

          {/* Menü-Button (rechts) */}
          <div className="absolute right-6 lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400"
            >
              <Bars3Icon aria-hidden="true" className="size-6" />
              <span className="sr-only">Open main menu</span>
            </button>
          </div>

          {/* Login/Logout */}
          <div className="hidden lg:flex absolute right-6">
            {user?.isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="text-sm/6 font-semibold text-white"
              >
                Log out <span aria-hidden="true">&rarr;</span>
              </button>
            ) : (
              <Link to="/login" className="text-sm/6 font-semibold text-white">
                Log in <span aria-hidden="true">&rarr;</span>
              </Link>
            )}
          </div>
        </nav>

        {/* Menü */}
        {mobileMenuOpen && (
          <Dialog
            open={mobileMenuOpen}
            onClose={setMobileMenuOpen}
            className="lg:hidden"
          >
            <div className="fixed inset-0 z-50 bg-black bg-opacity-50" />
            <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-900 px-6 py-6 sm:max-w-sm">
              <div className="flex items-center justify-between">
                <Link
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="-m-1.5 p-1.5"
                >
                  <img
                    alt="Mobile Logo"
                    src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500"
                    className="h-8 w-auto"
                  />
                </Link>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="-m-2.5 rounded-md p-2.5 text-gray-400"
                >
                  <XMarkIcon aria-hidden="true" className="size-6" />
                  <span className="sr-only">Close menu</span>
                </button>
              </div>

              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/25">
                  <div className="py-6">
                    {user?.isLoggedIn ? (
                      <button
                        onClick={() => {
                          handleLogout();
                          setMobileMenuOpen(false);
                        }}
                        className="-mx-3 block w-full rounded-lg px-3 py-2.5 text-left text-base/7 font-semibold text-white hover:bg-gray-800"
                      >
                        Log out
                      </button>
                    ) : (
                      <Link
                        to="/login"
                        onClick={() => setMobileMenuOpen(false)}
                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-white hover:bg-gray-800"
                      >
                        Log in
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </DialogPanel>
          </Dialog>
        )}
      </header>

      {isHome && (
        <div className="relative isolate pt-14">
          {/* Hintergrund oben */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          >
            <div
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, " +
                  "85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, " +
                  "52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, " +
                  "0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
              className="relative left-[calc(50%-11rem)] aspect-[1155/678]
                         w-[36.125rem] -translate-x-1/2 rotate-[30deg]
                         bg-gradient-to-tr from-[#ff80b5] to-[#9089fc]
                         opacity-20 sm:left-[calc(50%-30rem)]
                         sm:w-[72.1875rem]"
            />
          </div>

          <div className="flex py-24 sm:py-32 lg:pb-40">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-2xl text-center">
                <h1 className="text-balance text-5xl font-semibold tracking-tight text-white sm:text-7xl">
                  Find your Room
                </h1>
                <p className="mt-8 text-pretty text-lg font-medium text-gray-400 sm:text-xl/8">
                  Anim aute id magna aliqua ad ad non deserunt sunt.
                  Qui irure qui lorem cupidatat commodo.
                  Elit sunt amet fugiat veniam occaecat.
                </p>
              </div>
              <Filter filters={filters} setFilters={setFilters} />
            </div>
          </div>

          {/* Hintergrund unten */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10
                       transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          >
            <div
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, " +
                  "85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, " +
                  "52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, " +
                  "0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
              className="relative left-[calc(50%+3rem)] aspect-[1155/678]
                         w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr
                         from-[#ff80b5] to-[#9089fc] opacity-20
                         sm:left-[calc(50%+36rem)]
                         sm:w-[72.1875rem]"
            />
          </div>
        </div>
      )}
    </div>
  );
}
