<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index() {
        return view('welcome');
    }
    public function store(Request $request) {
        $category = new Category();
        $category->name = $request->name;
        $category->description = $request->description;
        $category->status = $request->status;
        $category->save();
        return response()->json([
            'status'=>'success'
        ]);
    }
    public function showCategory(){
        $categories = Category::all();
        return response()->json([
            'categories'=>$categories
        ]);
    }
    public function deleteCategory($id){
        $category = Category::find($id);
        $category->delete();
        if($category){
            return response()->json([
                'status'=>'200'
            ]);
        }else{
            return response()->json([
                'status'=>'404'
            ]);
        }
    }
    public function edit($id){
        $category = Category::find($id);
        if($category){
            return response()->json([
                'status'=>'200',
                'category'=>$category
            ]);
        }else{
            return response()->json([
                'status'=>'404'
            ]);
        }
    }
    public function update(Request $category,$id) {
        $category = Category::find($id);
        $category->name = $request->name;
        $category->description = $request->description;
        $category->status = $request->status;
        $category->save();
        if($category){
            return response()->json([
                'status'=>'200'
            ]);
        }else{
            return response()->json([
                'status'=>'404'
            ]);
        }
    }
    public function active($id){
        $active = Category::find($id);
        $active->status = 2;
        $active->save();
        if($active){
            return response()->json([
                'status'=>'200'
            ]);
        }
    }
    public function inactive($id){
        $inactive = Category::find($id);
        $inactive->status = 1;
        $inactive->save();
        if($inactive) {
            return response()->json([
                'status'=>'200'
            ]);
        }
    }
}
