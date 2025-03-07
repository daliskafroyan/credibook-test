{
  description = "Vite React JS development environment with PNPM";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs {
          inherit system;
        };
      in
      {
        devShells.default = pkgs.mkShell {
          buildInputs = with pkgs; [
            # Node.js
            nodejs_20

            # PNPM package manager
            nodePackages.pnpm
          ];

          shellHook = ''
            echo "Vite React JS development environment with PNPM"
            echo "Node.js version: $(node --version)"
            echo "PNPM version: $(pnpm --version)"
          '';
        };
      }
    );
} 