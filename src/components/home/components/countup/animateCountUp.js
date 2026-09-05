import { gsap } from "@/utils/gsap.utils";

export const animateCountUp = (element, endValue, duration = 2) => {
  if (!element) return;

  const target = { val: 0 };

  return gsap.to(target, {
    val: endValue,
    duration: duration,
    ease: "power2.out",
    onUpdate: () => {
      // Math.ceil gives us clean whole numbers as it counts up without triggering layout reflows
      element.textContent = Math.ceil(target.val);
    },
  });
};
