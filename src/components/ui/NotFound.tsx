import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 space-y-5">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="text-xl text-gray-600">Oops! Page non trouvée.</p>
      <Link to="/">
        <Button>Retour à l'accueil</Button>
      </Link>
    </div>
  );
};

export default NotFound;
