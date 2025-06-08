import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

void main() {
  runApp(const ShineNetAIChat());
}

class ShineNetAIChat extends StatelessWidget {
  const ShineNetAIChat({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Shine Net AI Chat',
      theme: ThemeData(
        // A classic, rich blue‐purple primary swatch
        primarySwatch: Colors.deepPurple,
        scaffoldBackgroundColor: Colors.white,
        inputDecorationTheme: const InputDecorationTheme(
          filled: true,
          fillColor: Colors.white70,
          border: OutlineInputBorder(
            borderRadius: BorderRadius.all(Radius.circular(12.0)),
            borderSide: BorderSide(width: 1.5, color: Colors.deepPurple),
          ),
          focusedBorder: OutlineInputBorder(
            borderRadius: BorderRadius.all(Radius.circular(12.0)),
            borderSide: BorderSide(width: 2.0, color: Colors.deepPurple),
          ),
        ),
        elevatedButtonTheme: ElevatedButtonThemeData(
          style: ElevatedButton.styleFrom(
            backgroundColor: Colors.deepPurpleAccent,
            foregroundColor: Colors.white,
            textStyle: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(12.0),
            ),
            padding: const EdgeInsets.symmetric(vertical: 14, horizontal: 24),
          ),
        ),
      ),
      home: const AIChatPage(),
    );
  }
}

class AIChatPage extends StatefulWidget {
  const AIChatPage({Key? key}) : super(key: key);

  @override
  _AIChatPageState createState() => _AIChatPageState();
}

class _AIChatPageState extends State<AIChatPage> {
  final TextEditingController _controller = TextEditingController();
  String _response = '';
  String _error = '';
  bool _loading = false;

  Future<void> _sendPrompt() async {
    final prompt = _controller.text.trim();
    if (prompt.isEmpty) return;

    setState(() {
      _loading = true;
      _response = '';
      _error = '';
    });

    try {
      final uri = Uri.parse(
        'http://10.0.2.15:8000/api/ai/?prompt=${Uri.encodeComponent(prompt)}',
      );
      final res = await http.get(uri);
      final data = json.decode(res.body);

      if (data['error'] != null) {
        setState(() {
          _error = data['error'];
        });
      } else {
        setState(() {
          _response = data['ai_response'];
        });
      }
    } catch (e) {
      setState(() {
        _error = 'Network error: failed to reach the AI endpoint.';
      });
    } finally {
      setState(() {
        _loading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      // Use a Stack to layer the gradient, logo, and content
      body: Stack(
        children: [
          // 1. Gradient background
          Container(
            decoration: const BoxDecoration(
              gradient: LinearGradient(
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
                colors: [Colors.deepPurple, Colors.indigo, Colors.blueAccent],
              ),
            ),
          ),

          // 2. Positioned logo at top center
          Positioned(
            top: 40,
            left: 0,
            right: 0,
            child: Center(
              child: SizedBox(
                width: 100,
                height: 100,
                child: Image.asset('assets/logo.jpeg'),
              ),
            ),
          ),

          // 3. Main chat UI below the logo
          Center(
            child: SingleChildScrollView(
              child: Padding(
                padding: const EdgeInsets.fromLTRB(24.0, 160.0, 24.0, 24.0),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: [
                    const Text(
                      'Shine Net AI Chat',
                      textAlign: TextAlign.center,
                      style: TextStyle(
                        fontSize: 32,
                        fontWeight: FontWeight.bold,
                        color: Colors.white,
                      ),
                    ),
                    const SizedBox(height: 30),
                    TextField(
                      controller: _controller,
                      style: const TextStyle(fontSize: 18, color: Colors.black87),
                      decoration: const InputDecoration(
                        labelText: 'Enter your prompt',
                        labelStyle: TextStyle(color: Colors.deepPurple),
                      ),
                    ),
                    const SizedBox(height: 20),
                    ElevatedButton(
                      onPressed: _loading ? null : _sendPrompt,
                      child: Text(_loading ? 'Loading...' : 'Send to AI'),
                    ),
                    const SizedBox(height: 30),
                    if (_error.isNotEmpty)
                      Container(
                        padding: const EdgeInsets.all(12.0),
                        decoration: BoxDecoration(
                          color: Colors.redAccent.withOpacity(0.8),
                          borderRadius: BorderRadius.circular(8),
                        ),
                        child: Text(
                          _error,
                          style: const TextStyle(color: Colors.white, fontSize: 16),
                          textAlign: TextAlign.center,
                        ),
                      ),
                    if (_response.isNotEmpty)
                      Container(
                        padding: const EdgeInsets.all(16.0),
                        decoration: BoxDecoration(
                          color: Colors.white.withOpacity(0.85),
                          borderRadius: BorderRadius.circular(12),
                          boxShadow: const [
                            BoxShadow(
                              color: Colors.black26,
                              blurRadius: 8,
                              offset: Offset(2, 2),
                            ),
                          ],
                        ),
                        child: Text(
                          _response,
                          style: const TextStyle(fontSize: 18, color: Colors.black87),
                        ),
                      ),
                    const SizedBox(height: 60),
                  ],
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
