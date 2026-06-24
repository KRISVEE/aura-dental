import { useEffect, useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

export function useBookingModal() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const isOpen = searchParams.get("booking") === "true";

  const openModal = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("booking", "true");
    // Use push so they can use browser back button to close it
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }, [searchParams, router, pathname]);

  const closeModal = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("booking");
    // Replace to not clutter history if they just closed it, or push?
    // standard behavior for back-button-support is pushing a clean URL, but 
    // router.back() might be better if they got here via push. 
    // To be safe and deterministic, we push the clean URL.
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }, [searchParams, router, pathname]);

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeModal]);

  // Body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return {
    isOpen,
    openModal,
    closeModal,
  };
}
