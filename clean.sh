echo "🧼 Starting cleanup..."

echo "🔍 Running TypeScript compiler..."
npx tsc --noEmit
if [ $? -ne 0 ]; then
  echo "❌ TypeScript errors found. Fix them before submitting."
  exit 1
fi

echo "🧹 Running ESLint with autofix..."
npx eslint . --ext .ts,.tsx --fix

echo "🔍 Checking for unused imports..."
npm run lint
if [ $? -ne 0 ]; then
  echo "❌ Unused imports found. Please remove them."
  exit 1
fi

echo "🎨 Formatting code with Prettier..."
npx prettier . --write

echo "🧪 Pruning unused npm packages..."
npm prune

echo "🔐 Running npm audit fix..."
npm audit fix

echo "📁 Reminder: Ensure .gitignore excludes .next/, node_modules/, and other generated files."

echo "✅ Cleanup finished!"
