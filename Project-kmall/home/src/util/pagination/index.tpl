<ul class="pagination">
    {{#pageArray}}
        {{#disable}}
            <li class="page-item disabled"  data-value="{{value}}">{{name}}</li>
        {{/disable}}
        {{^disable}}
            {{#active}}
                <li class="page-item active"  data-value="{{value}}">{{name}}</li>
            {{/active}}
            {{^active}}
                <li class="page-item"  data-value="{{value}}">{{name}}</li>
            {{/active}}
        {{/disable}}
    {{/pageArray}}
    <li class="page-summ">{{current}}/{{pages}}</li>
</ul>