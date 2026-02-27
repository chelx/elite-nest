import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

export default withMermaid(
    defineConfig({
        title: "EliteNest",
        description: "The Enterprise NestJS Monorepo Framework",
        base: '/elite-nest/',
        appearance: 'dark',
        locales: {
            root: {
                label: 'English',
                lang: 'en',
                themeConfig: {
                    nav: [
                        { text: 'Home', link: '/' },
                        { text: 'Guide', link: '/onboarding/zero-to-hero' }
                    ],
                    sidebar: [
                        {
                            text: 'Onboarding',
                            items: [
                                { text: 'Principal-Level Guide', link: '/onboarding/principal-guide' },
                                { text: 'Zero-to-Hero Path', link: '/onboarding/zero-to-hero' },
                            ]
                        },
                        {
                            text: 'Getting Started',
                            items: [
                                { text: 'Overview & Architecture', link: '/getting-started/overview' },
                                { text: 'Local Setup', link: '/getting-started/setup' },
                                { text: 'The CLI Tool', link: '/getting-started/cli-usage' },
                            ]
                        },
                        {
                            text: 'Deep Dive: Data',
                            items: [
                                { text: 'Multi-tenancy', link: '/deep-dive-data/multi-tenancy' },
                                { text: 'Soft-delete', link: '/deep-dive-data/soft-delete' },
                                { text: 'Base Repository', link: '/deep-dive-data/base-repository' },
                                { text: 'Audit Logging', link: '/deep-dive-data/audit-logging' },
                            ]
                        },
                        {
                            text: 'Deep Dive: Security',
                            items: [
                                { text: 'RBAC with CASL', link: '/deep-dive-security/rbac-casl' },
                                { text: 'JWT & Tenant Strategies', link: '/deep-dive-security/jwt-tenant' },
                                { text: 'Security Hardening', link: '/deep-dive-security/hardening' },
                            ]
                        },
                        {
                            text: 'Deep Dive: Utilities',
                            items: [
                                { text: 'Multi-tenant Cache', link: '/deep-dive-utilities/cache-service' },
                                { text: 'Cloud Storage', link: '/deep-dive-utilities/storage-service' },
                            ]
                        }
                    ],
                }
            },
            vi: {
                label: 'Tiếng Việt',
                lang: 'vi',
                link: '/vi/',
                themeConfig: {
                    nav: [
                        { text: 'Trang chủ', link: '/vi/' },
                        { text: 'Hướng dẫn', link: '/vi/onboarding/zero-to-hero' }
                    ],
                    sidebar: [
                        {
                            text: 'Nhập môn',
                            items: [
                                { text: 'Cấp độ Senior', link: '/vi/onboarding/principal-guide' },
                                { text: 'Lộ trình Zero-to-Hero', link: '/vi/onboarding/zero-to-hero' },
                            ]
                        },
                        {
                            text: 'Bắt đầu',
                            items: [
                                { text: 'Tổng quan & Kiến trúc', link: '/vi/getting-started/overview' },
                                { text: 'Cài đặt môi trường', link: '/vi/getting-started/setup' },
                                { text: 'Sử dụng CLI', link: '/vi/getting-started/cli-usage' },
                            ]
                        },
                        {
                            text: 'Dữ liệu (Deep Dive)',
                            items: [
                                { text: 'Multi-tenancy', link: '/vi/deep-dive-data/multi-tenancy' },
                                { text: 'Soft-delete', link: '/vi/deep-dive-data/soft-delete' },
                                { text: 'Base Repository', link: '/vi/deep-dive-data/base-repository' },
                                { text: 'Audit Logging', link: '/vi/deep-dive-data/audit-logging' },
                            ]
                        },
                        {
                            text: 'Bảo mật (Deep Dive)',
                            items: [
                                { text: 'RBAC với CASL', link: '/vi/deep-dive-security/rbac-casl' },
                                { text: 'JWT & Tenant Strategies', link: '/vi/deep-dive-security/jwt-tenant' },
                                { text: 'Security Hardening', link: '/vi/deep-dive-security/hardening' },
                            ]
                        },
                        {
                            text: 'Tiện ích (Deep Dive)',
                            items: [
                                { text: 'Multi-tenant Cache', link: '/vi/deep-dive-utilities/cache-service' },
                                { text: 'Cloud Storage', link: '/vi/deep-dive-utilities/storage-service' },
                            ]
                        }
                    ],
                }
            }
        },
        themeConfig: {
            socialLinks: [
                { icon: 'github', link: 'https://github.com/chelx/elite-nest' }
            ]
        },
        mermaid: {
            theme: 'dark',
            themeVariables: {
                primaryColor: '#1e3a5f',
                primaryTextColor: '#e0e0e0',
                primaryBorderColor: '#4a9eed',
                lineColor: '#4a9eed',
                secondaryColor: '#2d4a3e',
                tertiaryColor: '#2d2d3d',
                background: '#1a1a2e',
                mainBkg: '#1e3a5f',
                nodeBorder: '#4a9eed',
                clusterBkg: '#16213e',
                titleColor: '#e0e0e0',
                edgeLabelBackground: '#1a1a2e'
            }
        }
    })
)
