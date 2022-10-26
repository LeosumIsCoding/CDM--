const routes = [
    {
        path: '/',
        name: 'about',
        redirect: '/home',
    },
    {
        path: "/home",
        name: "Home",
        redirect: "/standard",
        component: () => import("../views/Home.vue"),
        children: [
            {
                path: "/standard",
                name: "Standard",
                component: () => import("../views/CdmManage/Standard.vue"),
                meta: {
                    searchShow: false
                }
            }, {
                path: "/standardclassification",
                name: "StandardClassification",
                component: () => import("../views/CdmManage/StandardClassification.vue"),
                meta: {
                    searchShow: false
                }
            }, {
                path: "/classficationInfo",
                name: "ClassficationInfo",
                component: () => import("../views/CdmManage/ClassficationInfo.vue"),
                meta: {
                    searchShow: true
                }
            },
            {
                path: "/userinfo",
                name: "UserInfo",
                component: () => import("../views/User/UserInfo.vue"),
                meta: {
                    searchShow: false
                }
            }, {
                path: "/terminology",
                name: "Terminology",
                redirect: '/terminology/diseasecategory',
                component: () => import("../views/CdmManage/Terminology/TerminologyHome.vue"),
                meta: {
                    searchShow: false
                },
                children: [
                    {
                        path: "/terminology/diseasecategory",
                        name: "DiseaseCategory",
                        component: () => import("../views/CdmManage/Terminology/DiseaseCategory.vue"),
                        meta: {
                            searchShow: false
                        }
                    }, {
                        path: "/terminology/tcmsyndromes",
                        name: 'TCMSyndromes',
                        component: () => import("../views/CdmManage/Terminology/TCMSyndromes.vue"),
                        meta: {
                            searchShow: false
                        }
                    }, {
                        path: "/terminology/governanceterms",
                        name: "GovernanceTerms",
                        component: () => import("../views/CdmManage/Terminology/GovernanceTerms.vue"),
                        meta: {
                            searchShow: false
                        }
                    }
                ]
            },{
                path:"/fangjie",
                name:"fangjie",
                component:()=>import("../views/MultipleCases/fangjie.vue")
            },{
                path:"/fangyao",
                name:"fangyao",
                component:()=>import("../views/MultipleCases/Fangyao.vue")
            },{
                path:"/jiajian",
                name:"jiajian",
                component:()=>import("../views/MultipleCases/jiajian.vue")
            },{
                path:"/lizi",
                name:"lizi",
                component:()=>import("../views/MultipleCases/lizi.vue")
            },{
                path:"/zucheng",
                name:"zucheng",
                component:()=>import("../views/MultipleCases/zucheng.vue")}

        ]
    }, {
        path: '/login',
        name: 'Login',
        component: () => import("../views/Login.vue"),
        meta: {
            searchShow: false
        }
    }, {
        path: '/register',
        name: 'Register',
        component: () => import("../views/Register.vue"),
        meta: {
            searchShow: false
        }
    }
];

export default routes;