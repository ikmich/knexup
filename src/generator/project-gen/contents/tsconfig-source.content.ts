export const tsconfigSourceContent = `{
  "compilerOptions": {
    "target": "ESNext",
    "lib": [
      "ESNext"
    ],
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "resolveJsonModule": true,
    "rootDir": "./src",
    "outDir": "./dist",
    "baseUrl": "./",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": false,
    "strict": true,
    "noImplicitAny": true,
    "strictPropertyInitialization": true,
    "noUnusedLocals": true,
    "incremental": true,
    "skipLibCheck": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "allowSyntheticDefaultImports": true
  }
}
`;