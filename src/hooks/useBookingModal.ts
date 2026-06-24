import { useEffect, useCallback, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

export function useBookingModal() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [isEagerlyClosed, setIsEagerlyClosed] = useState(false);

  // Sync eager state when search params change externally
  useEffect(() => {
    if (searchParams.get("booking") !== "true") {
      setIsEagerlyClosed(false);
    }
  }, [searchParams]);

  const isOpen = searchParams.get("booking") === "true" && !isEagerlyClosed;

  const openModal = useCallback(() => {
    setIsEagerlyClosed(false);
    const params = new URLSearchParams(searchParams.toString());
    params.set("booking", "true");
    // Use push so they can use browser back button to close it
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }, [searchParams, router, pathname]);

  const closeModal = useCallback(() => {
    console.log("[useBookingModal] closeModal triggered");
    
    // Eagerly unmount the modal before the Next.js router catches up
    setIsEagerlyClosed(true);

    const params = new URLSearchParams(searchParams.toString());
    params.delete("booking");
    const newUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname;
    
    console.log("[useBookingModal] Executing history.replaceState and router.replace to:", newUrl);
    
    // Synchronously strip the URL param for immediate visual feedback
    window.history.replaceState(null, "", newUrl);
    
    // Formalize the route change with Next.js
    router.replace(newUrl, { scroll: false });
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
