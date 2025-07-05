## 🤝 Cara Berkontribusi

> ⚠️ **Jangan lakukan `push` langsung ke branch `develop`.**

Gunakan sistem _branching_ dan _commit_ yang sesuai dengan panduan berikut.

---

### 🔀 Aturan Branching

- Untuk perbaikan atau peningkatan:
  ```bash
  git checkout -b "chore/nama-perbaikan"
  ```

- Untuk perbaikan bug:
  ```bash
  git checkout -b "fix/nama-bug"
  ```

- Untuk penambahan fitur:
  ```bash
  git checkout -b "feat/nama-fitur"
  ```

---

### 📦 Aturan Commit

- Untuk perbaikan atau peningkatan:
  ```bash
  git commit -m "chore: deskripsi perbaikan"
  ```

- Untuk perbaikan bug:
  ```bash
  git commit -m "fix: deskripsi bug"
  ```

- Untuk penambahan fitur:
  ```bash
  git commit -m "feat: deskripsi fitur"
  ```

---

## 🧩 Mengatasi Konflik Git

### 🔧 Cara 1

1. Simpan pekerjaan sementara:
   ```bash
   git stash
   ```

2. Ambil pembaruan dari branch `develop`:
   ```bash
   git pull origin develop
   ```

3. Kembalikan pekerjaan sebelumnya:
   ```bash
   git stash pop
   ```

4. Lanjutkan pekerjaan seperti biasa.

---

### 🔧 Cara 2 (Jika masih terjadi konflik)

1. Pindah ke branch `develop`:
   ```bash
   git checkout develop
   ```

2. Ambil update terbaru:
   ```bash
   git pull
   ```

3. Pindah kembali ke branch kamu:
   ```bash
   git checkout <nama-branch-kamu>
   ```

4. Gabungkan branch `develop` ke branch kamu:
   ```bash
   git merge origin develop
   ```

---

## 🧑‍💻 Rekomendasi Code Editor

**Visual Studio Code**

### 🔌 Rekomendasi Extension VSCode:

- Stylelint
- Tailwind CSS IntelliSense
- Prettier
- Error Lens
- ESLint