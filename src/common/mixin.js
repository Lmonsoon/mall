import { debounce } from "common/utils";
import BackTop from "components/content/backtop/BackTop";
export const itemListenerMixin = {
    data() {
        return {
            homeItemImageLoad: null,
            refresh: null
        }
    },
    mounted() {
        this.refresh = debounce(this.$refs.scroll.refresh, 100)
        this.homeItemImageLoad = () => {
            this.refresh()
        }
        this.$bus.$on('itemImageLoad', this.homeItemImageLoad);


    }

}
export const backTopMixin = {
    data() {
        return {
            isShowBackTop: false,
        }
    },
    methods: {
        backClick() {
            this.$refs.scroll.scrollTo(0, 0, 500);
        },
    },
    components: {
        BackTop,
    }
}