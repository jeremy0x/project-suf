import { useState, useRef, useEffect } from "react";
import { useQuery, useMutation, useAction } from "convex/react";
import { api } from "../../convex/_generated/api";
import { gooeyToast } from "goey-toast";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  generateToken,
  verifyToken,
  setCookie,
  getCookie,
  eraseCookie,
} from "@/lib/crypto";
import {
  DashboardSquareIcon,
  Package02Icon,
  GalleryHorizontalEndIcon,
  Globe02Icon,
  ShoppingBag02Icon,
  PackageOutOfStockIcon,
  PlusSignIcon,
  Delete02Icon,
  ImageUploadIcon,
  Cancel01Icon,
  SaveIcon,
  Edit02Icon,
  Logout01Icon,
  ArrowDown01Icon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
  ArrowUp01Icon,
  ShieldCheck,
  LockKeyIcon,
  EyeIcon,
  ViewOffIcon,
  Login01Icon,
  CheckmarkCircle01Icon,
  UserAdd01Icon,
  Menu01Icon,
  LoaderPinwheelIcon,
} from "@hugeicons/core-free-icons";
import { motion, AnimatePresence } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import type { Doc, Id } from "../../convex/_generated/dataModel";
import Logo from "@/components/Logo";
import { ConfirmModal } from "@/components/admin/ConfirmModal";
import { ImageDropZone } from "@/components/admin/ImageDropZone";
import { ProductsTable } from "@/components/admin/ProductsTable";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";

type Tab = "dashboard" | "products" | "gallery" | "site";

function StepItem({
  number,
  text,
  active,
}: {
  number: number;
  text: string;
  active?: boolean;
}) {
  return (
    <motion.div
      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
        active
          ? "bg-white text-brand-dark border border-white/20 shadow-lg"
          : "bg-white/5 text-white/60 border border-transparent"
      }`}
      variants={itemVariants}
    >
      <span
        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
          active ? "bg-brand-dark text-white" : "bg-white/10 text-white/40"
        }`}
      >
        {active ? (
          <HugeiconsIcon icon={CheckmarkCircle01Icon} size={14} />
        ) : (
          number
        )}
      </span>
      <span className={`text-sm font-medium ${active ? "" : "text-white/40"}`}>
        {text}
      </span>
    </motion.div>
  );
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;
    if (password === adminPassword) {
      setIsSigningIn(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      try {
        const token = await generateToken();
        setCookie("suf_admin_token", token, 7);
        onLogin();
      } catch (err) {
        setIsSigningIn(false);
        setError("Encryption error occurred");
      }
    } else {
      setError("Invalid password");
    }
  };

  const steps = [
    { number: 1, text: "Authenticate identity", active: true },
    { number: 2, text: "Access dashboard", active: false },
    { number: 3, text: "Manage content", active: false },
  ];

  if (isSigningIn) {
    return (
      <div className="min-h-screen bg-brand-dark flex flex-col items-center justify-center gap-4 transition-all duration-500">
        <HugeiconsIcon
          icon={LoaderPinwheelIcon}
          size={48}
          className="text-brand-blue animate-spin"
        />
        <p className="text-white font-medium font-heading tracking-wide animate-pulse">
          Signing in...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-dark selection:bg-brand-blue/30 p-2 transition-all duration-500 lg:h-screen lg:overflow-hidden lg:p-4">
      <div className="flex min-h-full w-full lg:h-full">
        {/* Left Column - Hero */}
        <motion.div
          className="hidden lg:flex relative flex-col items-center justify-between pb-12 px-12 rounded-3xl overflow-hidden shadow-2xl h-full w-[52%]"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Background image */}
          <img
            src="https://images.unsplash.com/photo-1590487988256-9ed24133863e?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Z3ltfGVufDB8fDB8fHww"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-brand-dark/40 to-brand-dark/60" />

          {/* Ambient grid dots */}
          <div
            className="absolute inset-0 z-0 opacity-[0.08]"
            aria-hidden="true"
            style={{
              backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)`,
              backgroundSize: `32px 32px`,
            }}
          />

          {/* Glow orbs */}
          <div
            className="absolute inset-0 pointer-events-none z-0"
            aria-hidden="true"
          >
            <div className="absolute right-[-20%] top-[-10%] w-[40%] h-[40%] rounded-full bg-orange-500/20 blur-[120px]" />
            <div className="absolute left-[-10%] bottom-[-20%] w-[35%] h-[35%] rounded-full bg-brand-blue/20 blur-[100px]" />
          </div>

          {/* Content */}
          <motion.div
            className="relative z-10 w-full flex flex-col h-full"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Logo */}
            <motion.div
              className="flex items-center gap-3 pt-6"
              variants={itemVariants}
            >
              <Logo variant="white" />
              <span className="text-lg font-bold font-heading tracking-tight text-white">
                Shape Up Fitness
              </span>
            </motion.div>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Heading */}
            <motion.div className="space-y-3 mb-10" variants={itemVariants}>
              <h2 className="text-4xl font-medium font-heading tracking-tight text-white">
                Admin Portal
              </h2>
              <p className="text-white/50 text-sm leading-relaxed max-w-xs">
                Manage products, gallery images, and site content all in one
                place.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Right Column - Form */}
        <div className="flex-1 flex flex-col items-center justify-center py-12 lg:py-6 px-4 sm:px-12 lg:px-16 xl:px-24 overflow-y-auto lg:overflow-hidden">
          <motion.div
            className="w-full max-w-xl space-y-8 lg:space-y-6 sm:space-y-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Header */}
            <div className="text-center lg:text-left">
              <h1 className="text-3xl font-medium font-heading tracking-tight text-white">
                Admin Login
              </h1>
              <p className="text-white/40 text-sm mt-1">
                Enter your credentials to access the dashboard.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-white">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20">
                    <HugeiconsIcon icon={LockKeyIcon} size={16} />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError("");
                    }}
                    placeholder="Enter admin password"
                    className="w-full bg-white/5 border border-white/10 rounded-xl h-12 pl-10 pr-12 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:border-brand-blue transition-all text-sm"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/60 transition-colors"
                  >
                    {showPassword ? (
                      <HugeiconsIcon icon={ViewOffIcon} size={16} />
                    ) : (
                      <HugeiconsIcon icon={EyeIcon} size={16} />
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <motion.p
                  className="text-red-400 text-sm text-center bg-red-500/10 rounded-xl py-2.5 px-4 border border-red-500/20"
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {error}
                </motion.p>
              )}

              <button
                type="submit"
                className="w-full h-12 bg-brand-blue text-white font-semibold rounded-full hover:bg-brand-blue/90 active:scale-[0.98] transition-all mt-2 flex items-center justify-center gap-2"
              >
                <HugeiconsIcon icon={UserAdd01Icon} size={18} />
                Sign In
              </button>
            </form>

            <p className="text-center text-white/20 text-xs">
              Authorized personnel only
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [matches, query]);

  return matches;
}

interface ResponsiveModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: React.ReactNode;
}

function ResponsiveModal({
  isOpen,
  onOpenChange,
  title,
  description,
  children,
}: ResponsiveModalProps) {
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-100 sm:rounded-2xl shadow-xl">
          <DialogHeader>
            <DialogTitle className="font-heading font-bold text-xl text-gray-900 dark:text-gray-100">
              {title}
            </DialogTitle>
            {description && (
              <DialogDescription className="text-sm text-gray-400 mt-1">
                {description}
              </DialogDescription>
            )}
          </DialogHeader>
          <div className="py-2">{children}</div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[92vh] flex flex-col bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-100">
        <DrawerHeader className="text-left shrink-0 p-5 border-b border-gray-100 dark:border-gray-800">
          <DrawerTitle className="font-heading font-bold text-xl text-gray-900 dark:text-gray-100">
            {title}
          </DrawerTitle>
          {description && (
            <DrawerDescription className="text-sm text-gray-400 mt-1">
              {description}
            </DrawerDescription>
          )}
        </DrawerHeader>
        <div className="px-5 py-6 overflow-y-auto flex-1">{children}</div>
      </DrawerContent>
    </Drawer>
  );
}

function ImageDimensions({ url }: { url: string }) {
  const [dimensions, setDimensions] = useState<{
    width: number;
    height: number;
  } | null>(null);

  useEffect(() => {
    const img = new Image();
    img.src = url;
    img.onload = () => {
      setDimensions({ width: img.naturalWidth, height: img.naturalHeight });
    };
  }, [url]);

  if (!dimensions)
    return <span className="text-[10px] text-gray-400">Detecting...</span>;

  return (
    <span className="text-[10px] font-mono text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">
      {dimensions.width} × {dimensions.height} px
    </span>
  );
}

async function uploadFileToConvex(
  file: File,
  generateUrl: () => Promise<string>,
): Promise<string> {
  const uploadUrl = await generateUrl();
  const res = await fetch(uploadUrl, { method: "POST", body: file });
  if (!res.ok) throw new Error("Upload to storage failed");
  const { storageId } = await res.json();
  return storageId;
}

function ProductForm({
  product,
  onDone,
  categories,
}: {
  product?: Doc<"products">;
  onDone: () => void;
  categories: { name: string; label: string }[];
}) {
  const createProduct = useMutation(api.products.create);
  const updateProduct = useMutation(api.products.update);
  const generateUrl = useMutation(api.upload.generateUploadUrl);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const processUpload = useAction(api.upload.processUpload as any);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    name: product?.name || "",
    description: product?.description || "",
    price: product?.price?.toString() || "",
    category: product?.category || "",
    stockQuantity: product?.stockQuantity ?? 0,
    featured: product?.featured ?? false,
    images:
      product?.images || ([] as { url: string; alt: string; order: number }[]),
  });

  const handleFileUpload = async (file: File) => {
    setUploading(true);
    try {
      const storageId = await uploadFileToConvex(file, () => generateUrl());
      const result = await processUpload({
        storageId,
        section: "products",
        alt: form.name || file.name,
      });

      if (result?.url) {
        setForm((prev) => ({
          ...prev,
          images: [
            ...prev.images,
            {
              url: result.url,
              alt: form.name || file.name,
              order: prev.images.length,
            },
          ],
        }));
        gooeyToast.success("Image uploaded & compressed");
      }
    } catch (err) {
      gooeyToast.error("Upload failed", {
        description: err instanceof Error ? err.message : "Unknown error",
      });
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index: number) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images
        .filter((_, i) => i !== index)
        .map((img, i) => ({ ...img, order: i })),
    }));
  };

  const moveImage = (from: number, to: number) => {
    if (to < 0 || to >= form.images.length) return;
    setForm((prev) => {
      const imgs = [...prev.images];
      const [moved] = imgs.splice(from, 1);
      imgs.splice(to, 0, moved);
      return { ...prev, images: imgs.map((img, i) => ({ ...img, order: i })) };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.price) {
      gooeyToast.error("Name and price are required");
      return;
    }

    const data = {
      name: form.name,
      description: form.description,
      price: parseFloat(form.price),
      category: form.category || "general",
      images: form.images,
      stockQuantity: parseInt(form.stockQuantity.toString()) || 0,
      featured: form.featured,
    };

    const promise = product
      ? updateProduct({ id: product._id, ...data })
      : createProduct(data);

    gooeyToast.promise(promise, {
      loading: product ? "Updating product..." : "Creating product...",
      success: product ? "Product updated" : "Product created",
      error: "Failed to save product",
    });
    await promise;
    onDone();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Name</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
            className="w-full px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-blue text-sm"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Price (NGN)</label>
          <input
            type="number"
            value={form.price}
            onChange={(e) => setForm((p) => ({ ...p, price: e.target.value }))}
            className="w-full px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-blue text-sm"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Category</label>
          <select
            value={form.category}
            onChange={(e) =>
              setForm((p) => ({ ...p, category: e.target.value }))
            }
            className="w-full h-10 px-4 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue appearance-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
              backgroundPosition: "right 0.75rem center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "1.25rem",
            }}
          >
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat.name} value={cat.name}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Stock Quantity</label>
          <input
            type="number"
            min={0}
            value={form.stockQuantity}
            onChange={(e) =>
              setForm((p) => ({
                ...p,
                stockQuantity: parseInt(e.target.value) || 0,
              }))
            }
            className="w-full px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-blue text-sm"
          />
        </div>
        <div className="flex items-center gap-6 pt-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) =>
                setForm((p) => ({ ...p, featured: e.target.checked }))
              }
              className="w-4 h-4 rounded border-gray-300 text-brand-blue focus:ring-brand-blue"
            />
            <span className="text-sm">Featured</span>
          </label>
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Description</label>
        <textarea
          value={form.description}
          onChange={(e) =>
            setForm((p) => ({ ...p, description: e.target.value }))
          }
          rows={4}
          className="w-full px-4 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-blue text-sm resize-none"
        />
      </div>
      <div className="space-y-3">
        <label className="text-sm font-medium">Images</label>
        <div className="flex flex-wrap gap-3">
          {form.images.map((img, i) => (
            <div key={i} className="flex flex-col items-center gap-1.5">
              <div className="relative">
                <img
                  src={img.url}
                  alt=""
                  className="w-24 h-24 rounded-xl object-cover"
                />
                {i === 0 && (
                  <span className="absolute top-1 left-1 text-[10px] font-bold bg-brand-blue text-white px-1.5 py-0.5 rounded-full">
                    Cover
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => moveImage(i, i - 1)}
                  disabled={i === 0}
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors disabled:opacity-30"
                >
                  <HugeiconsIcon icon={ArrowLeft01Icon} size={12} />
                </button>
                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  className="p-1 hover:bg-red-50 dark:hover:bg-red-950 text-red-400 rounded-full transition-colors"
                >
                  <HugeiconsIcon icon={Delete02Icon} size={12} />
                </button>
                <button
                  type="button"
                  onClick={() => moveImage(i, i + 1)}
                  disabled={i === form.images.length - 1}
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors disabled:opacity-30"
                >
                  <HugeiconsIcon icon={ArrowRight01Icon} size={12} />
                </button>
              </div>
            </div>
          ))}
          <ImageDropZone onUpload={handleFileUpload} uploading={uploading} />
        </div>
      </div>
      <div className="flex gap-3">
        <button
          type="submit"
          className="px-6 py-2.5 bg-brand-blue text-white rounded-full font-medium hover:opacity-90 transition-opacity"
        >
          {product ? "Update Product" : "Create Product"}
        </button>
        <button
          type="button"
          onClick={onDone}
          className="px-6 py-2.5 rounded-full border border-gray-300 dark:border-gray-600 text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          Cancel
        </button>
      </div>{" "}
    </form>
  );
}

function GalleryManager({ showAddImage, setShowAddImage }: { showAddImage: boolean; setShowAddImage: (v: boolean) => void }) {
  const images = (useQuery(api.siteImages.listBySection, {
    section: "gallery",
  }) || []) as Doc<"siteImages">[];
  const galleryCats = (useQuery(api.categories.listBySection, {
    section: "gallery",
  }) || []) as { _id: string; name: string; label: string }[];
  const removeImage = useMutation(api.siteImages.remove);
  const updateImage = useMutation(api.siteImages.update);
  const reorderAdjacent = useMutation(api.siteImages.reorderAdjacent);
  const generateUrl = useMutation(api.upload.generateUploadUrl);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const processUpload = useAction(api.upload.processUpload as any);
  const [uploading, setUploading] = useState(false);
  const [activeGalleryCat, setActiveGalleryCat] = useState("all");
  const [uploadCat, setUploadCat] = useState("");
  const [confirmDel, setConfirmDel] = useState<{ id: Id<"siteImages">; label: string } | null>(null);

	const sorted = [...images].sort((a, b) => a.order - b.order);
  const filtered =
    activeGalleryCat === "all"
      ? sorted
      : sorted.filter((img) => img.category === activeGalleryCat);

  const handleUpload = async (file: File) => {
    setUploading(true);
    try {
      const storageId = await uploadFileToConvex(file, () => generateUrl());
      const result = await processUpload({
        storageId,
        section: "gallery",
        category: uploadCat || undefined,
        alt: file.name,
      });
      if (result?.url) {
        gooeyToast.success("Image uploaded");
        setShowAddImage(false);
      }
    } catch (err) {
      gooeyToast.error("Upload failed", {
        description: err instanceof Error ? err.message : "Error",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <ResponsiveModal
        isOpen={showAddImage}
        onOpenChange={setShowAddImage}
        title="Add Image"
        description="Choose a category and upload a gallery image."
      >
        <div className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900 dark:text-gray-100">
              Image category
            </label>
            <select
              value={uploadCat}
              onChange={(e) => setUploadCat(e.target.value)}
              className="w-full h-12 rounded-full border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue appearance-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                backgroundPosition: "right 0.75rem center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "1.25rem",
              }}
            >
              <option value="">Uncategorized</option>
              {galleryCats.map((c) => (
                <option key={c.name} value={c.name}>{c.label}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 p-4">
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                Upload image
              </p>
              <p className="text-xs text-gray-500">
                Drop a photo here after choosing the category.
              </p>
            </div>
            <ImageDropZone onUpload={handleUpload} uploading={uploading} />
          </div>
        </div>
      </ResponsiveModal>

      <div className="flex flex-wrap gap-2 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-2">
        {[
          { name: "all", label: "All", count: sorted.length },
          ...galleryCats.map((c) => ({
            ...c,
            count: sorted.filter((i) => i.category === c.name).length,
          })),
        ].map((tab) => (
          <button
            key={tab.name}
            onClick={() => setActiveGalleryCat(tab.name)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${activeGalleryCat === tab.name ? "bg-brand-blue text-white shadow-sm" : "bg-transparent text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"}`}
          >
            <span>{tab.label}</span>
            <span className="ml-2 text-xs opacity-70">{tab.count}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {filtered.map((img, idx) => (
          <div
            key={img._id}
            className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm"
          >
            <div className="aspect-square relative group bg-gray-100 dark:bg-gray-800">
              <span className="absolute top-2 left-2 z-10 text-[10px] font-mono text-white bg-black/50 px-1.5 py-0.5 rounded-full">
                {idx + 1}
              </span>
              <img
                src={img.url}
                alt=""
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button
                  onClick={() => gooeyToast.promise(reorderAdjacent({ id: img._id, direction: "up" }), { loading: "Moving...", success: "Moved", error: "Failed" })}
                  disabled={idx === 0}
                  className="p-2 bg-white rounded-full disabled:opacity-30 hover:bg-white/90 transition-all shadow"
                >
                  <HugeiconsIcon icon={ArrowLeft01Icon} size={16} />
                </button>
                <button
                  onClick={() => setConfirmDel({ id: img._id, label: img.alt || "this image" })}
                  className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all shadow"
                >
                  <HugeiconsIcon icon={Delete02Icon} size={16} />
                </button>
                <button
                  onClick={() => gooeyToast.promise(reorderAdjacent({ id: img._id, direction: "down" }), { loading: "Moving...", success: "Moved", error: "Failed" })}
                  disabled={idx === filtered.length - 1}
                  className="p-2 bg-white rounded-full disabled:opacity-30 hover:bg-white/90 transition-all shadow"
                >
                  <HugeiconsIcon icon={ArrowRight01Icon} size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="text-center text-sm text-gray-400 py-10">
          No images in this category
        </p>
      )}

      <ConfirmModal
        open={!!confirmDel}
        onConfirm={() => { if (confirmDel) { removeImage({ id: confirmDel.id }); gooeyToast.success("Image removed"); } setConfirmDel(null); }}
        onCancel={() => setConfirmDel(null)}
        title="Delete Image"
        message={`Remove this image from the gallery?`}
        confirmLabel="Delete"
      />
    </div>
  );
}

function SectionImageManager({
  section,
  label,
  replaceOnly,
}: {
  section: string;
  label: string;
  replaceOnly?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const images = useQuery(api.siteImages.listBySection, { section }) || [];
  const removeImage = useMutation(api.siteImages.remove);
  const updateImage = useMutation(api.siteImages.update);
  const generateUrl = useMutation(api.upload.generateUploadUrl);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const processUpload = useAction(api.upload.processUpload as any);
  const [uploading, setUploading] = useState(false);
  const [replaceTarget, setReplaceTarget] = useState<Id<"siteImages"> | null>(null);
  const [confirmDel, setConfirmDel] = useState<Id<"siteImages"> | null>(null);

  const handleUpload = async (file: File) => {
    setUploading(true);
    try {
      const storageId = await uploadFileToConvex(file, () => generateUrl());
      const result = await processUpload({
        storageId,
        section,
        alt: file.name,
      });
      if (result?.url && replaceTarget) {
        await updateImage({
          id: replaceTarget,
          url: result.url,
          alt: file.name,
        });
        setReplaceTarget(null);
        gooeyToast.success(`${label} replaced`);
      } else if (result?.url) {
        gooeyToast.success(`${label} image added`);
      }
    } catch (err) {
      gooeyToast.error("Upload failed", {
        description: err instanceof Error ? err.message : "Error",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleReplace = (id: Id<"siteImages">) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async (e: Event) => {
      const file = (e.target as HTMLInputElement)?.files?.[0];
      if (!file) return;
      if (file.size > 10 * 1024 * 1024) {
        gooeyToast.error("File too large (max 10MB)");
        return;
      }
      setReplaceTarget(id);
      await handleUpload(file);
    };
    input.click();
  };

  return (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden shadow-sm">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors text-left"
      >
        <div>
          <h3 className="font-heading font-semibold text-base text-gray-900 dark:text-gray-100">
            {label}
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">
            {images.length} {images.length === 1 ? "image" : "images"} uploaded
          </p>
        </div>
        <div className="flex items-center gap-2 text-gray-400">
          {uploading && <span className="text-xs">Uploading...</span>}
          <HugeiconsIcon
            icon={ArrowRight01Icon}
            size={20}
            className={`transition-transform duration-300 ${isOpen ? "rotate-90" : ""}`}
          />
        </div>
      </button>

      {isOpen && (
        <div className="p-5 border-t border-gray-200 dark:border-gray-800 space-y-4">
          {images.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {images.map((img) => (
                <div
                  key={img._id}
                  className="relative aspect-[3/4] rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 group bg-gray-50 dark:bg-gray-900 shadow-sm"
                >
                  <img
                    src={img.url}
                    alt={img.alt || ""}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleReplace(img._id)}
                      className="p-2 bg-white text-gray-900 rounded-full hover:bg-gray-100 transition-colors shadow-sm"
                      title="Replace image"
                    >
                      <HugeiconsIcon icon={ImageUploadIcon} size={16} />
                    </button>
                    {!replaceOnly && (
                      <button
                        type="button"
                        onClick={() => setConfirmDel(img._id)}
                        className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                      >
                        <HugeiconsIcon icon={Delete02Icon} size={16} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 text-gray-400">
              <span className="text-sm">No image set</span>
            </div>
          )}
          {!replaceOnly && (
            <div className="pt-2 border-t border-gray-100 dark:border-gray-800/50">
              <ImageDropZone onUpload={handleUpload} uploading={uploading} />
            </div>
          )}
        </div>
      )}

      <ConfirmModal
        open={!!confirmDel}
        onConfirm={() => { if (confirmDel) { removeImage({ id: confirmDel }); gooeyToast.success("Image removed"); } setConfirmDel(null); }}
        onCancel={() => setConfirmDel(null)}
        title="Delete Image"
        message="Remove this image?"
        confirmLabel="Delete"
      />
    </div>
  );
}
function CategoryManager() {
  const categories = (useQuery(api.categories.listBySection, { section: "gallery" }) || []) as Doc<"imageCategories">[];
  const removeCat = useMutation(api.categories.remove);
  const createCat = useMutation(api.categories.create);
  const renameCat = useAction(api.categories.renameAndSync);
  const [label, setLabel] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [editVal, setEditVal] = useState("");
  const [confirmDel, setConfirmDel] = useState<Id<"imageCategories"> | null>(null);

  const handleAdd = async () => {
    if (!label.trim()) return;
    const name = label.toLowerCase().replace(/\s+/g, "-");
    const exists = categories.some((c) => c.name === name);
    if (exists) { gooeyToast.error("Category already exists"); return; }
    try {
      await createCat({ section: "gallery", name, label: label.trim(), order: categories.length + 1 });
      gooeyToast.success("Gallery category added");
      setLabel("");
    } catch { gooeyToast.error("Failed to add category"); }
  };

  const handleRename = async (cat: Doc<"imageCategories">, newLabel: string) => {
    if (!newLabel.trim() || newLabel.trim() === cat.label) { setEditId(null); return; }
    const newName = newLabel.toLowerCase().replace(/\s+/g, "-");
    const exists = categories.some((c) => c.name === newName && c._id !== cat._id);
    if (exists) { gooeyToast.error("A category with that key already exists"); setEditId(null); return; }
    try {
      await renameCat({ id: cat._id, name: newName, label: newLabel.trim(), oldName: cat.name });
      gooeyToast.success("Category renamed");
    } catch { gooeyToast.error("Failed to rename"); }
    setEditId(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          placeholder="New category label"
          className="flex-1 h-10 px-4 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue"
        />
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2 bg-brand-blue text-white rounded-full font-medium text-sm hover:opacity-90 transition-opacity shrink-0"
        >
          <HugeiconsIcon icon={PlusSignIcon} size={16} />
          Add
        </button>
      </div>
      {categories.length === 0 ? (
        <div className="text-center py-10 text-gray-400 text-sm">No gallery categories yet</div>
      ) : (
        <div>
          {categories.map((cat, i) => (
            <div key={cat._id} className="relative flex items-center justify-between px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
              {editId === cat._id ? (
                <input
                  type="text"
                  value={editVal}
                  onChange={(e) => setEditVal(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleRename(cat, editVal);
                    if (e.key === "Escape") setEditId(null);
                  }}
                  onBlur={() => handleRename(cat, editVal)}
                  className="flex-1 text-sm font-medium bg-gray-100 dark:bg-gray-800 rounded-full px-3 py-1 focus:outline-none focus:ring-2 focus:ring-brand-blue"
                  autoFocus
                />
              ) : (
                <button
                  onClick={() => { setEditId(cat._id); setEditVal(cat.label); }}
                  className="text-sm font-medium text-gray-900 dark:text-gray-100 hover:text-brand-blue transition-colors text-left"
                >
                  {cat.label}
                </button>
              )}
              <button
                onClick={() => setConfirmDel(cat._id)}
                className="p-1.5 hover:bg-red-50 dark:hover:bg-red-950/30 text-red-500 rounded-full transition-colors shrink-0"
              >
                <HugeiconsIcon icon={Delete02Icon} size={14} />
              </button>
              {i < categories.length - 1 && <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[10%] border-t border-dashed border-gray-200 dark:border-gray-700" />}
            </div>
          ))}
        </div>
      )}

      <ConfirmModal
        open={!!confirmDel}
        onConfirm={() => { if (confirmDel) { removeCat({ id: confirmDel }); gooeyToast.success("Category removed"); } setConfirmDel(null); }}
        onCancel={() => setConfirmDel(null)}
        title="Delete Category"
        message="Remove this category? Images in it will become uncategorized."
        confirmLabel="Delete"
      />
    </div>
  );
}

function ProductCategoryManager() {
  const cats = (useQuery(api.productCategories.list) || []) as Doc<"productCategories">[];
  const createCat = useMutation(api.productCategories.create);
  const removeCat = useMutation(api.productCategories.remove);
  const renameCat = useAction(api.productCategories.renameAndSync);
  const [label, setLabel] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [editVal, setEditVal] = useState("");
  const [confirmDel, setConfirmDel] = useState<Id<"productCategories"> | null>(null);

  const handleAdd = async () => {
    if (!label.trim()) return;
    const name = label.toLowerCase().replace(/\s+/g, "-");
    if (cats.some((c) => c.name === name)) { gooeyToast.error("Category already exists"); return; }
    try { await createCat({ name, label: label.trim() }); gooeyToast.success("Product category added"); setLabel(""); }
    catch { gooeyToast.error("Category already exists"); }
  };

  const handleRename = async (cat: Doc<"productCategories">, newLabel: string) => {
    if (!newLabel.trim() || newLabel.trim() === cat.label) { setEditId(null); return; }
    const newName = newLabel.toLowerCase().replace(/\s+/g, "-");
    const exists = cats.some((c) => c.name === newName && c._id !== cat._id);
    if (exists) { gooeyToast.error("A category with that key already exists"); setEditId(null); return; }
    try { await renameCat({ id: cat._id, name: newName, label: newLabel.trim(), oldName: cat.name }); gooeyToast.success("Category renamed"); }
    catch { gooeyToast.error("Failed to rename"); }
    setEditId(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input type="text" value={label} onChange={(e) => setLabel(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleAdd()} placeholder="New category label"
          className="flex-1 h-10 px-4 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue" />
        <button onClick={handleAdd} className="flex items-center gap-2 px-4 py-2 bg-brand-blue text-white rounded-full font-medium text-sm hover:opacity-90 transition-opacity shrink-0">
          <HugeiconsIcon icon={PlusSignIcon} size={16} /> Add
        </button>
      </div>
      {cats.length === 0 ? (
        <div className="text-center py-10 text-gray-400 text-sm">No product categories yet</div>
      ) : (
        <div>
          {cats.map((cat, i) => (
            <div key={cat._id} className="relative flex items-center justify-between px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
              {editId === cat._id ? (
                <input type="text" value={editVal} onChange={(e) => setEditVal(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") handleRename(cat, editVal); if (e.key === "Escape") setEditId(null); }}
                  onBlur={() => handleRename(cat, editVal)}
                  className="flex-1 text-sm font-medium bg-gray-100 dark:bg-gray-800 rounded-full px-3 py-1 focus:outline-none focus:ring-2 focus:ring-brand-blue" autoFocus />
              ) : (
                <button onClick={() => { setEditId(cat._id); setEditVal(cat.label); }}
                  className="text-sm font-medium text-gray-900 dark:text-gray-100 hover:text-brand-blue transition-colors text-left">{cat.label}</button>
              )}
              <button onClick={() => setConfirmDel(cat._id)}
                className="p-1.5 hover:bg-red-50 dark:hover:bg-red-950/30 text-red-500 rounded-full transition-colors shrink-0">
                <HugeiconsIcon icon={Delete02Icon} size={14} />
              </button>
              {i < cats.length - 1 && <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[10%] border-t border-dashed border-gray-200 dark:border-gray-700" />}
            </div>
          ))}
        </div>
      )}

      <ConfirmModal
        open={!!confirmDel}
        onConfirm={() => { if (confirmDel) { removeCat({ id: confirmDel }); gooeyToast.success("Category removed"); } setConfirmDel(null); }}
        onCancel={() => setConfirmDel(null)}
        title="Delete Product Category"
        message="Remove this category? Products in it will need to be reassigned."
        confirmLabel="Delete"
      />
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CategoryPanel({ title, icon, children, onClose }: { title: string; icon: any; children: React.ReactNode; onClose: () => void }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; document.documentElement.style.overflow = ""; };
  }, []);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] !m-0"
        onClick={onClose}
      />
      {isMobile ? (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 30, stiffness: 260 }}
          className="fixed bottom-0 left-0 right-0 z-[70] bg-white dark:bg-gray-900 rounded-t-3xl shadow-2xl flex flex-col max-h-[85vh]"
        >
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800 shrink-0">
            <div className="flex items-center gap-2">
              <HugeiconsIcon icon={icon} size={20} className="text-brand-blue" />
              <h2 className="font-heading font-bold text-lg">{title}</h2>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
              <HugeiconsIcon icon={Cancel01Icon} size={20} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            {children}
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "100%", opacity: 0 }}
          transition={{ type: "spring", damping: 28, stiffness: 220 }}
          className="fixed top-4 right-4 bottom-4 z-[70] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl flex flex-col w-full max-w-md border border-gray-200 dark:border-gray-800 !m-0"
        >
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800 shrink-0">
            <div className="flex items-center gap-2">
              <HugeiconsIcon icon={icon} size={20} className="text-brand-blue" />
              <h2 className="font-heading font-bold text-lg">{title}</h2>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
              <HugeiconsIcon icon={Cancel01Icon} size={20} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            {children}
          </div>
        </motion.div>
      )}
    </>
  );
}

function AdminSidebar({
  activeTab,
  onTabChange,
  onLogout,
  mobileOpen,
  onMobileToggle,
}: {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
  onLogout: () => void;
  mobileOpen: boolean;
  onMobileToggle: (open: boolean) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const isExpanded = hovered;

  const sidebarW = isExpanded ? "w-56" : "w-16";

  const items = [
    { key: "dashboard" as Tab, label: "Dashboard", icon: DashboardSquareIcon },
    { key: "products" as Tab, label: "Products", icon: Package02Icon },
    { key: "gallery" as Tab, label: "Gallery", icon: GalleryHorizontalEndIcon },
    { key: "site" as Tab, label: "Site Images", icon: Globe02Icon },
  ];

  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 dark:bg-black/70 z-40 lg:hidden"
          onClick={() => onMobileToggle(false)}
        />
      )}

      <aside
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`fixed left-0 top-0 z-50 h-screen ${sidebarW} border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 flex flex-col transition-all duration-300 ease-in-out lg:translate-x-0 overflow-hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          aria-hidden="true"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(0,0,0,0.15) 1px, transparent 1px)`,
            backgroundSize: `28px 28px`,
          }}
        />
        <div className="flex h-16 items-center justify-center border-b border-gray-200 dark:border-gray-800">
          <Logo className="h-10 w-auto shrink-0 dark:hidden" variant="header" />
          <Logo className="h-10 w-auto shrink-0 hidden dark:block" variant="white" />
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-2 space-y-1 [&::-webkit-scrollbar]:hidden">
          {items.map((item) => (
            <button
              key={item.key}
              onClick={() => {
                onTabChange(item.key);
                onMobileToggle(false);
              }}
              className={`w-full flex items-center justify-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeTab === item.key
                  ? "bg-brand-blue/10 text-brand-blue"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-800/50"
              }`}
            >
              <HugeiconsIcon icon={item.icon} size={20} className="shrink-0" />
              <span className={`whitespace-nowrap text-left flex-1 ${isExpanded ? "block" : "hidden"}`}>
                {item.label}
              </span>
            </button>
          ))}
        </div>

        <div className="p-3 border-t border-gray-200 dark:border-gray-800 space-y-1">
          <a
            href="/shop"
            target="_blank"
            className={`w-full flex items-center justify-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-800/50 transition-all`}
          >
            <HugeiconsIcon icon={ShoppingBag02Icon} size={20} className="shrink-0" />
            <span className={`whitespace-nowrap text-left flex-1 ${isExpanded ? "block" : "hidden"}`}>
              View Shop
            </span>
          </a>
          <button
            onClick={onLogout}
            className={`w-full flex items-center justify-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all`}
          >
            <HugeiconsIcon icon={Logout01Icon} size={20} className="shrink-0" />
            <span className={`whitespace-nowrap text-left flex-1 ${isExpanded ? "block" : "hidden"}`}>
              Logout
            </span>
          </button>
        </div>
      </aside>
    </>
  );
}
export default function Admin() {
  const [authenticated, setAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<
    Doc<"products"> | undefined
  >(undefined);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [showProductCatPanel, setShowProductCatPanel] = useState(false);
  const [showGalleryCatPanel, setShowGalleryCatPanel] = useState(false);
  const [showAddImage, setShowAddImage] = useState(false);

  const products: Doc<"products">[] = useQuery(api.products.list, {}) || [];
  const totalImages = useQuery(api.siteImages.getTotalCount) || 0;
  const galleryImages =
    useQuery(api.siteImages.listBySection, { section: "gallery" }) || [];
  const deleteProduct = useMutation(api.products.remove);
  const categories =
    useQuery(api.categories.listBySection, {
      section: "gallery",
    }) || [];
  const prodCats = useQuery(api.productCategories.list) || [];

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState<() => void>(() => {});
  const [confirmTitle, setConfirmTitle] = useState("");
  const [confirmMessage, setConfirmMessage] = useState("");

  const askConfirm = (title: string, message: string, action: () => void) => {
    setConfirmTitle(title);
    setConfirmMessage(message);
    setConfirmAction(() => action);
    setConfirmOpen(true);
  };

  useEffect(() => {
    async function verifyPersistedSession() {
      try {
        const token = getCookie("suf_admin_token");
        if (token) {
          const isValid = await verifyToken(token);
          if (isValid) {
            setAuthenticated(true);
          } else {
            eraseCookie("suf_admin_token");
          }
        }
      } catch (err) {
        console.error("Auto-login error:", err);
      } finally {
        setCheckingAuth(false);
      }
    }
    verifyPersistedSession();
  }, []);

  const handleLogout = async () => {
    setShowLogoutConfirm(false);
    setIsLoggingOut(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    eraseCookie("suf_admin_token");
    setAuthenticated(false);
    setIsLoggingOut(false);
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-brand-dark flex flex-col items-center justify-center gap-4">
        <HugeiconsIcon
          icon={LoaderPinwheelIcon}
          size={48}
          className="text-brand-blue animate-spin"
        />
        <p className="text-white font-medium font-heading tracking-wide animate-pulse">
          Loading...
        </p>
      </div>
    );
  }

  if (isLoggingOut) {
    return (
      <div className="min-h-screen bg-brand-dark flex flex-col items-center justify-center gap-4 transition-all duration-500">
        <HugeiconsIcon
          icon={LoaderPinwheelIcon}
          size={48}
          className="text-brand-blue animate-spin"
        />
        <p className="text-white font-medium font-heading tracking-wide animate-pulse">
          Logging out...
        </p>
      </div>
    );
  }

  if (!authenticated) {
    return <AdminLogin onLogin={() => setAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <AdminSidebar
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          setShowProductForm(false);
          setEditingProduct(undefined);
        }}
        onLogout={() => setShowLogoutConfirm(true)}
        mobileOpen={mobileSidebarOpen}
        onMobileToggle={setMobileSidebarOpen}
      />

      {/* Product Form Modal */}
      <ResponsiveModal
        isOpen={showProductForm}
        onOpenChange={setShowProductForm}
        title={editingProduct ? "Edit Product" : "New Product"}
        description={
          editingProduct
            ? "Update product details in catalog"
            : "Add a new product to your catalog"
        }
      >
        <ProductForm
          product={editingProduct}
          onDone={() => setShowProductForm(false)}
          categories={prodCats.map((c: Doc<"productCategories">) => ({ name: c.name, label: c.label }))}
        />
      </ResponsiveModal>

      {/* Logout Confirmation Modal */}
      <ResponsiveModal
        isOpen={showLogoutConfirm}
        onOpenChange={setShowLogoutConfirm}
        title="Confirm Logout"
        description="Are you sure you want to log out of the admin panel?"
      >
        <div className="flex flex-col gap-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            You will need to enter your admin password again to access the
            portal next time.
          </p>
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              onClick={() => setShowLogoutConfirm(false)}
              className="px-4 py-2 text-sm font-medium border border-gray-200 dark:border-gray-800 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium bg-red-600 hover:bg-red-700 text-white rounded-xl transition-colors"
            >
              Log Out
            </button>
          </div>
        </div>
      </ResponsiveModal>

      {/* Main content offset by collapsed sidebar width */}
      <div className="lg:pl-16 min-h-screen">
        <header className="h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-6 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-2 -ml-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              <HugeiconsIcon icon={Menu01Icon} size={20} />
            </button>
            <div>
              <h1 className="font-heading font-bold text-2xl text-gray-950 dark:text-white">
                {activeTab === "dashboard" && "Dashboard"}
                {activeTab === "products" && "Products"}
                {activeTab === "gallery" && "Gallery"}
                {activeTab === "site" && "Site Images"}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {activeTab === "products" && (
              <>
                <button
                  onClick={() => setShowProductCatPanel(true)}
                  className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 rounded-full font-medium text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  Categories
                </button>
                <button
                  onClick={() => {
                    setEditingProduct(undefined);
                    setShowProductForm(true);
                  }}
                   className="px-4 py-2 bg-brand-blue text-white rounded-full font-medium text-sm hover:opacity-90 transition-opacity animate-none"
                >
                  New Product
                </button>
              </>
            )}
            {activeTab === "gallery" && (
              <>
                <button
                  onClick={() => setShowGalleryCatPanel(true)}
                  className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 rounded-full font-medium text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  Categories
                </button>
                <button
                  onClick={() => setShowAddImage(true)}
                  className="px-4 py-2 bg-brand-blue text-white rounded-full font-medium text-sm hover:opacity-90 transition-opacity"
                >
                  Add Image
                </button>
              </>
            )}
          </div>
        </header>

        <main className="p-6 space-y-6">
          {activeTab === "dashboard" &&
            (() => {
              const cats = Array.from(new Set(products.map((p) => p.category)));
              const outQty = products.filter(
                (p) => (p.stockQuantity ?? 0) === 0,
              ).length;
              const lowQty = products.filter((p) => {
                const q = p.stockQuantity ?? 0;
                return q > 0 && q <= 10;
              }).length;
              const goodQty = products.length - outQty - lowQty;
              return (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[
                      {
                        value: products.length,
                        label: "Products",
                        icon: Package02Icon,
                        color: "text-brand-blue",
                      },
                      {
                        value: totalImages,
                        label: "Site Images",
                        icon: Globe02Icon,
                        color: "text-brand-blue",
                      },
                      {
                        value: galleryImages.length,
                        label: "Gallery Images",
                        icon: GalleryHorizontalEndIcon,
                        color: "text-brand-gold",
                      },
                      {
                        value: outQty,
                        label: "Out of Stock",
                        icon: PackageOutOfStockIcon,
                        color: "text-red-500",
                      },
                    ].map((card) => (
                      <div
                        key={card.label}
                        className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-200 dark:border-gray-800 flex items-center justify-between"
                      >
                        <div>
                          <p className="text-3xl font-bold font-heading">
                            {card.value}
                          </p>
                          <p className="text-sm text-gray-500">{card.label}</p>
                        </div>
                        <HugeiconsIcon
                          icon={card.icon}
                          size={28}
                          className={`${card.color} opacity-30`}
                        />
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
                      <h3 className="font-heading font-bold text-sm mb-4 text-gray-500">
                        Stock Status
                      </h3>
                      <div className="flex items-center gap-6">
                        <ResponsiveContainer width={160} height={160}>
                          <PieChart>
                            <Pie
                              data={[
                                {
                                  name: "In Stock",
                                  value: goodQty,
                                  color: "#22c55e",
                                },
                                {
                                  name: "Low Stock",
                                  value: lowQty,
                                  color: "#eab308",
                                },
                                {
                                  name: "Out of Stock",
                                  value: outQty,
                                  color: "#ef4444",
                                },
                              ].filter((d) => d.value > 0)}
                              cx="50%"
                              cy="50%"
                              innerRadius={36}
                              outerRadius={60}
                              dataKey="value"
                              stroke="none"
                            >
                              {[
                                {
                                  name: "In Stock",
                                  value: goodQty,
                                  color: "#22c55e",
                                },
                                {
                                  name: "Low Stock",
                                  value: lowQty,
                                  color: "#eab308",
                                },
                                {
                                  name: "Out of Stock",
                                  value: outQty,
                                  color: "#ef4444",
                                },
                              ]
                                .filter((d) => d.value > 0)
                                .map((entry, i) => (
                                  <Cell key={i} fill={entry.color} />
                                ))}
                            </Pie>
                          </PieChart>
                        </ResponsiveContainer>
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center gap-2 text-sm">
                            <span className="w-3 h-3 rounded-full bg-green-500" />
                            <span className="text-gray-600 dark:text-gray-400">
                              In Stock
                            </span>
                            <span className="ml-auto font-medium tabular-nums">
                              {goodQty}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <span className="w-3 h-3 rounded-full bg-yellow-500" />
                            <span className="text-gray-600 dark:text-gray-400">
                              Low Stock
                            </span>
                            <span className="ml-auto font-medium tabular-nums">
                              {lowQty}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <span className="w-3 h-3 rounded-full bg-red-500" />
                            <span className="text-gray-600 dark:text-gray-400">
                              Out of Stock
                            </span>
                            <span className="ml-auto font-medium tabular-nums">
                              {outQty}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
                      <h3 className="font-heading font-bold text-sm mb-4 text-gray-500">
                        Products by Category
                      </h3>
                      <ResponsiveContainer
                        width="100%"
                        height={cats.length * 40 + 20}
                      >
                        <BarChart
                          data={cats.map((cat: string) => ({
                            name: cat.charAt(0).toUpperCase() + cat.slice(1),
                            count: products.filter((p) => p.category === cat)
                              .length,
                          }))}
                          layout="vertical"
                          margin={{ left: 20, right: 20, top: 5, bottom: 5 }}
                        >
                          <XAxis type="number" hide />
                          <YAxis
                            type="category"
                            dataKey="name"
                            tick={{ fontSize: 12 }}
                            width={80}
                          />
                          <Tooltip
                            contentStyle={{
                              borderRadius: 12,
                              border: "1px solid #e5e7eb",
                              fontSize: 12,
                            }}
                            formatter={(value) => [value, "Products"]}
                          />
                          <Bar
                            dataKey="count"
                            fill="#0eb2f1"
                            radius={[0, 4, 4, 0]}
                            barSize={20}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              );
            })()}

          {activeTab === "products" && (
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
              <ProductsTable
                products={products}
                categoryLabels={Object.fromEntries(prodCats.map((c: Doc<"productCategories">) => [c.name, c.label]))}
                onEdit={(product) => {
                  setEditingProduct(product);
                  setShowProductForm(true);
                }}
                onDelete={(product) => {
                  askConfirm(
                    "Delete Product",
                    `Delete "${product.name}"?`,
                    () => {
                      deleteProduct({ id: product._id });
                      gooeyToast.success("Product deleted");
                    },
                  );
                }}
              />
            </div>
          )}

          {activeTab === "gallery" && (
            <GalleryManager showAddImage={showAddImage} setShowAddImage={setShowAddImage} />
          )}

          {activeTab === "site" && (
            <div className="space-y-6">
              <SectionImageManager section="hero" label="Hero Image" replaceOnly />
              <SectionImageManager section="about-story" label="About Story Image" replaceOnly />
              <SectionImageManager section="home-about" label="Home About Section" replaceOnly />
              <SectionImageManager section="services" label="Service Image" replaceOnly />
              <SectionImageManager section="team" label="Team Photos" replaceOnly />
            </div>
          )}

          <AnimatePresence>
            {activeTab === "products" && showProductCatPanel && (
              <CategoryPanel title="Product Categories" icon={Package02Icon} onClose={() => setShowProductCatPanel(false)}>
                <ProductCategoryManager />
              </CategoryPanel>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {activeTab === "gallery" && showGalleryCatPanel && (
              <CategoryPanel title="Gallery Categories" icon={GalleryHorizontalEndIcon} onClose={() => setShowGalleryCatPanel(false)}>
                <CategoryManager />
              </CategoryPanel>
            )}
          </AnimatePresence>
        </main>
      </div>

      <ConfirmModal
        open={confirmOpen}
        onConfirm={() => {
          confirmAction();
          setConfirmOpen(false);
        }}
        onCancel={() => setConfirmOpen(false)}
        title={confirmTitle}
        message={confirmMessage}
      />
    </div>
  );
}
