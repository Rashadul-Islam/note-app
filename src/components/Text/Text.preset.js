import { colors } from "../../theme/colors";
import { typography } from "../../theme/typography";

const BASE = {
  fontFamily: typography.primary,
  fontSize: 14,
  color: colors.lightGrey,
};

BASE_BOLD = {
  fontFamily: typography.primaryBold,
  fontSize: 16,
  color: colors.drakGrey,
};

const BOLD = {
  fontFamily: typography.bold,
  color: colors.white,
};

export const presets = {
  default: BASE,
  bold: BOLD,
  h1: {
    ...BOLD,
    fontSize: 24,
  },
  h2: {
    ...BOLD,
    fontSize: 22,
  },
  h3: {
    ...BASE_BOLD,
    fontSize: 20,
  },
  h4: {
    ...BASE_BOLD,
    fontSize: 18,
  },
  h5: {
    ...BASE_BOLD,
    fontSize: 14,
  },
  small: {
    ...BASE,
    fontSize: 12,
  },
};
