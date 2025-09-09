import React from "react";

export default function Login() {
  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-r from-blue-100 via-white to-blue-50">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-96">
        
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img
            src="https://img.icons8.com/fluency/96/user-male-circle.png"
            alt="Logo"
            className="w-20 h-20"
          />
        </div>

        {/* Titre */}
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Bienvenue 👋
        </h2>

        {/* Formulaire */}
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="exemple@email.com"
              className="w-full mt-1 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Mot de passe
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full mt-1 px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Mot de passe oublié */}
          <div className="text-right">
            <a href="#" className="text-sm text-blue-600 hover:underline">
              Mot de passe oublié ?
            </a>
          </div>

          {/* Bouton */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Se connecter
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-2 text-gray-500 text-sm">OU</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Bouton secondaire */}
        <button className="w-full bg-gray-100 py-2 rounded-lg flex items-center justify-center space-x-2 hover:bg-gray-200 transition">
          <img
            src="https://img.icons8.com/color/24/google-logo.png"
            alt="Google"
          />
          <span>Se connecter avec Google</span>
        </button>

        {/* Créer un compte */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Pas encore de compte ?{" "}
          <a href="#" className="text-blue-600 font-medium hover:underline">
            Créer un compte
          </a>
        </p>
      </div>
    </div>
  );
}
