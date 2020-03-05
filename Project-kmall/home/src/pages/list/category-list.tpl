{{#categoryListData}}
<ul>
    <li class="parent">
        <i class="icon fa fas fa-minus-square-o"></i>
            <a href="javascript:" class="link">{{name}}</a>
        {{#children}}
        <ul>
            <li class="son" data-id="{{_id}}"><a class="link" href="javascript:">{{name}}</a></li>
        </ul>
        {{/children}}
    </li>
</ul>
{{/categoryListData}}