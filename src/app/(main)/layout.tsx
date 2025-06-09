"use client";

import React, { useMemo, useState } from "react";

import { MessageProvider } from "@context/message/MessageContext";
import { App, ConfigProvider, Layout, Menu, theme } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Footer } from "antd/es/layout/layout";
import { ItemType } from "antd/es/menu/interface";
import { useRouter } from "next/navigation";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const router = useRouter();

  const menuItems = useMemo<ItemType[]>(
    () => [
      { key: "1", label: "Home", onClick: () => router.push("/home") },
      {
        key: "2",
        label: "Categories",
        onClick: () => router.push("/categories"),
      },
      { key: "3", label: "Brands", onClick: () => router.push("/brands") },
      {
        key: "4",
        label: "Product lines",
        onClick: () => router.push("/product-lines"),
      },
      {
        key: "5",
        label: "Products",
        onClick: () => router.push("/products"),
      },
      {
        key: "6",
        label: "Promitions",
        onClick: () => router.push("/promotions"),
      },
      {
        key: "7",
        label: "Orders",
        onClick: () => router.push("/orders"),
      },
      {
        key: "8",
        label: "Users",
        onClick: () => router.push("/users"),
      },
      {
        key: "9",
        label: "Accounts",
        children: [
          {
            key: "9.1",
            label: "Accounts",
            onClick: () => router.push("/accounts"),
          },
          {
            key: "9.2",
            label: "Roles",
            onClick: () => router.push("/roles"),
          },
          {
            key: "9.3",
            label: "Permissons",
            onClick: () => router.push("/permissions"),
          },
        ],
      },
    ],
    []
  );

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.compactAlgorithm,
        token: {
          fontSize: 20,
        },
      }}
    >
      <App>
        <Layout style={{ minHeight: "100vh" }}>
          <Sider collapsible collapsed={collapsed} breakpoint="md" onCollapse={(value: boolean) => setCollapsed(value)}>
            <Menu defaultSelectedKeys={["1"]} mode="inline" items={menuItems} theme="dark" />
          </Sider>
          <Layout>
            <Content className="m-5">
              <MessageProvider>{children}</MessageProvider>
            </Content>
            <Footer>Ant Design ©{new Date().getFullYear()} Created by Ant UED</Footer>
          </Layout>
        </Layout>
      </App>
    </ConfigProvider>
  );
}
