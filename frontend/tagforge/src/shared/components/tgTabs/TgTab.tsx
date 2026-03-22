import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type tgTabProps = {
  tabItemList: string[]
  tabComponentList: React.ReactNode[]
}

export const TgTab = ({ tabItemList, tabComponentList }: tgTabProps) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div style={styles.container}>

      {/* Tabs */}
      <div style={styles.tabWrapper}>
        {tabItemList?.map((label, index) => (
          <div
            key={index}
            style={styles.tabItem}
            onClick={() => setActiveTab(index)}
          >
            {activeTab === index && (
              <motion.div
                layoutId="tab-indicator"
                style={styles.activeBackground}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}

            <span
              style={{
                ...styles.label,
                color: activeTab === index ? "#fff" : "#555"
              }}
            >
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* Content */}
      <div style={styles.contentWrapper}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            style={styles.content}
          >
            {tabComponentList?.[activeTab]}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: "100%",
    maxWidth: "900px",
    margin: "20px auto",
    fontFamily: "Inter, sans-serif"
  } as React.CSSProperties,

  tabWrapper: {
    display: "flex",
    background: "#f4f4f4",
    borderRadius: "12px",
    padding: "6px",
    position: "relative" as const
  } as React.CSSProperties,

  tabItem: {
    flex: 1,
    textAlign: "center" as const,
    padding: "10px 16px",
    cursor: "pointer",
    position: "relative" as const,
    fontWeight: 500
  } as React.CSSProperties,

  activeBackground: {
    position: "absolute" as const,
    inset: 0,
    background: "#111",
    borderRadius: "8px",
    zIndex: 0
  } as const,

  label: {
    position: "relative",
    zIndex: 1
  } as React.CSSProperties,

  contentWrapper: {
    marginTop: "30px"
  } as React.CSSProperties,

  content: {
    fontSize: "18px",
    color: "#333",
    lineHeight: "1.5"
  } as React.CSSProperties
};