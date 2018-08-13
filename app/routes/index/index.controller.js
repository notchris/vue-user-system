module.exports = (router) => {
    router.get("/",
        (req, res) => {
            const data = {
                user: req.user
            };
            req.vueOptions.head.title = "CMS";
            res.renderVue("index/index.vue", data, req.vueOptions);
        },
    );
};
