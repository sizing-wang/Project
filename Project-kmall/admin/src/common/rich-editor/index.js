import React, { Component } from "react"
import Simditor from "simditor"
import $ from "jquery"

import { UPLOADDETAILPATH } from "../../api/config"
import "simditor/styles/simditor.css"

class RichEditor extends Component {

    constructor (props) {
        super(props)
        this.state = {
            toolbar: [
                'title',
                'bold',
                'italic',
                'underline',
                'strikethrough',
                'fontScale',
                'color',
                'ol',
                'ul',
                'blockquote',
                'code',
                'table',
                'link',
                'image',
                'hr',
                'indent',
                'outdent',
                'alignment'
            ]
        }
        // 利用jquery, 携带cookie信息
        $.ajaxSetup({
            url: UPLOADDETAILPATH,
            xhrFields: {
                withCredentials: true // 这里设置了允许携带cookie信息
            }
        })
    }

    componentDidMount() {
        this.editor = new Simditor({
            textarea: this.textarea, // 副文本编辑器需要挂载的DOM节点
            toolbar: this.state.toolbar, // 菜单栏功能
            upload: { // 允许上传图片
                url: UPLOADDETAILPATH,
                fileKey: "upload" // 图片存储到的字段
            }
        })
        const { getValues } = this.props;
        this.editor.on("valuechanged", () => {
            getValues(this.editor.getValue());
        })
    }


    render() {
        return (
            <textarea
                ref={textarea => this.textarea = textarea}
                id="editor"
            ></textarea>
        )
    }
}

export default RichEditor
