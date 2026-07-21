import { Skeleton } from "../../../../../../shared/components/Skeleton";
import styles from "../ProductListPage.module.css";

const SKELETON_COUNT = 8;

export const ProductListSkeleton = () => {
  return (
    <>
      <div className={styles.topBar}>
        <Skeleton
          width="100%"
          height="40px"
          borderRadius="8px"
        />
      </div>

      <div className={styles.grid}>
        {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
          <div key={index}>
            <Skeleton
              width="100%"
              height="280px"
              borderRadius="12px"
            />
          </div>
        ))}
      </div>
    </>
  );
};
